// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";
import {Settings} from "@cryptocelts/contracts-typechain"
//

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const greenFalcoinFactory = await ethers.getContractFactory("GreenFalcoin");
  const greenFalcoin = await upgrades.deployProxy(greenFalcoinFactory,{
    kind: "uups",
    
  });
  await greenFalcoin.deployed();
  console.log("GreenFalCoin deployed to:", greenFalcoin.address);


  const celtMinterFactory = await ethers.getContractFactory("CeltMinter");
  const celtMinter = await upgrades.deployProxy(celtMinterFactory,[Settings.tokenUri],{
    kind: "uups",
  });  
  const amount = ethers.utils.parseEther("100000000000000");
  await greenFalcoin.mint(celtMinter.address,amount);
  console.log("CeltMinter deployed to:", celtMinter.address);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
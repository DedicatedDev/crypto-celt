import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, upgrades } from "hardhat";
import {
  CeltMinter,
  CeltMinter__factory,
  GreenFalcoin,
  GreenFalcoin__factory,
  Settings,
} from "@cryptocelts/contracts-typechain";
import { Contract, ContractFactory } from "ethers";

describe("CeltMinter", () => {
  let greenFalcoinFactory: ContractFactory;
  let greenFalcoin: Contract;

  let celtMinterFactory: ContractFactory;
  let celtMinter: Contract;
  let accounts: SignerWithAddress[];

  before(async () => {
    accounts = await ethers.getSigners();
  });

  it("deploy and mint nft", async () => {
     greenFalcoinFactory = await ethers.getContractFactory("GreenFalcoin");
     greenFalcoin = await upgrades.deployProxy(greenFalcoinFactory, {
      kind: "uups",
    });
    await greenFalcoin.deployed();
    console.log("GreenFalCoin deployed to:", greenFalcoin.address);

     celtMinterFactory = await ethers.getContractFactory("CeltMinter");
     celtMinter = await upgrades.deployProxy(
      celtMinterFactory,
      [greenFalcoin.address,Settings.tokenUri],
      {
        kind: "uups",
      }
    );
    const amount = ethers.utils.parseEther("100000000000000");
    await greenFalcoin.mint(celtMinter.address, amount);
  });

  it("airdrop", async () => {
    const amount = ethers.utils.parseEther("0.01");
    await celtMinter.connect(accounts[5]).claim(3,true,{value: amount});
  });

});

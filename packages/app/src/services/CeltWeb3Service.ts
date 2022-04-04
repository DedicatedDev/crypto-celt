import { BigNumber, ethers, Signer } from "ethers";
import { CeltMinter, CeltMinter__factory } from "../../typechain-types";
import { celtMinterAddress } from "../config";
import Web3Modal from "web3modal";
import CeltMinterABI from "../artifacts/contracts/CeltMinter.sol/CeltMinter.json";
import Moralis from "moralis";
import Axios from "axios";
import { TokenInfo } from "../interfaces/Nft";
import { AllTokens } from "../interfaces/AllTokens";
import { operations } from "moralis/types/generated/web3Api";
import { FTokenInfo } from "../interfaces/FTokenInfo";

const fetchMetaData = async (url: string) => {
  const data = await Axios.get(url);
  return data;
};
const validateTokenInfo = (items: any[]) => {
  return items.flatMap((item: any) => {
    const token: TokenInfo = {
      amount: item.amount,
      block_number: item.block_number,
      contract_type: item.contract_type,
      metadata: item.metadata,
      name: item.name,
      owner_of: item.owner_of,
      symbol: item.symbol,
      token_address: item.token_address,
      token_id: item.token_id,
      token_uri: item.token_uri,
    };
    return token;
  });
};

export const CeltWeb3Service = {
  sign: async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    return await signer.signMessage("Welcome to Celts!");
  },

  fetchAllNFTs: async (chain: string, tokenAddress?: string) => {
    const web3Modal = new Web3Modal();
    try {
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const accountAddress = await signer.getAddress();
      //const contract = new ethers.Contract(address, CeltMinterABI.abi, signer) as CeltMinter
      const options = { chain: chain, address: accountAddress };

      const myNFTs = await Moralis.Web3API.account.getNFTs(options);
      const celtNFTs = myNFTs.result.filter(
        (e) =>
          e.token_address === tokenAddress.toLowerCase() &&
          e.contract_type === "ERC1155"
      );
      const remainNFTs = myNFTs.result.filter(
        (e) =>
          e.token_address !== tokenAddress.toLowerCase() ||
          e.contract_type !== "ERC1155"
      );
      const allTokens:AllTokens = {
        celts: validateTokenInfo(celtNFTs),
        others:validateTokenInfo(remainNFTs)
      }
      return allTokens
    } catch (error) {
      console.log(error);
      const allTokens:AllTokens = {
        celts: [],
        others:[]
      }
      return allTokens
    }
  },

  fetchGreenFalCoinBalance: async(chain:string)=> {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const accountAddress = await signer.getAddress();
    const options = {
      chain: chain,
      address: accountAddress
    };
    const balances = await Moralis.Web3API.account.getTokenBalances(options)
    const tokens = balances.map((token)=>{
      let token_balance =  BigNumber.from(token.balance)
      let decimals = BigNumber.from(10)
      decimals = decimals.pow(+(token?.decimals ?? "0"))
      console.log(decimals)
      token_balance = token_balance.div(decimals)
      const tokenInfo:FTokenInfo = {
        name: token.name,
        symbol: token.symbol,
        token_address: token.token_address,
        balance: token_balance.toNumber()
      }
      return tokenInfo
    })
    return tokens
  }
};

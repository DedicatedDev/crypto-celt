import { styled } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import {
  CeltMinterABI,
  CeltMinter,
  Settings,
} from "@cryptocelts/contracts-typechain";
import MintBgImg from "../assets/mintBgImg.png";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Favicon from "../assets/favicon.png";
import OpenSeaIcon from "../assets/openseaIcon.svg";
import { delay } from "../utils/Utils";
import { TransactionStatus } from "../interfaces/celtMinter/TransactionStatus";
import { useAppContextStore } from "../contexts/AppContext";
import { useSnackbar } from "notistack";
import * as config from "../config";

export const Minter = () => {
  const MainContainer = styled("div")(({ theme }) => ({
    //width:'100vw',
    //position:'relative'
  }));

  const MainBgImgWrapper = styled("img")(({ theme }) => ({
    width: "100vw",
    zIndex: -1,
    //marginBottom:'-10px'
  }));

  const Footer = styled("div")(({ theme }) => ({
    backgroundColor: "#333",
    width: "100vw",
    padding: "50px",
    display: "flex",
    justifyContent: "center",
  }));

  const InputWrapper = styled(TextField)(({ theme }) => ({
    color: "black",
    multilineColor: {
      color: "white",
    },
  }));

  const ComponentContainer = styled("div")(({ theme }) => ({
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    left: "50%",
    top: "45%",
    transform: "translate(-50%, -50%)",
    justifyContent: "center",
    justifyItems: "center",
  }));

  const MintBtn = styled(Button)(({ theme }) => ({
    backgroundColor: "#3b6b53",
    width: "200px",
    height: "60px",
    color: "white",
    border: "solid 1px",
    borderColor: "white",
    fontSize: "22px",
    marginTop: "50px",
    zIndex: 1,
  }));

  const CheckNFTBtn = styled(Button)(({ theme }) => ({
    width: "40px",
    height: "40px",
  }));

  const MessageWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    padding: "50px",
    justifyContent: "center",
  }));

  const [formInput, updateFormInput] = useState({ count: 0 });
  const [status, setStatus] = useState(TransactionStatus.finish);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const count: number = +event.target.value.toString();
    updateFormInput((prev) => ({ ...prev, count: count }));
  };

  const { allTokens } = useAppContextStore();
  const claim = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      Settings.celtMinterAddress.toLowerCase(),
      CeltMinterABI.abi,
      signer
    ) as CeltMinter;

    const count = +formInput.count;
    if (count === 0) {
      return;
    }

    setStatus(TransactionStatus.inProgress);
    const amount = ethers.utils.parseEther("0.01");
    let whiteRobeCnt: number = 0;

    allTokens.celts.forEach((item) => {
      const metadata = JSON.parse(item.metadata);
      const atts = metadata?.attributes ?? [];
      atts.forEach((element: any): void => {
        if (
          element.trait_type.toLowerCase() === "robe" &&
          element.value.toLowerCase().includes("grey")
        ) {
          whiteRobeCnt += 1;
        }
      });
    });
    let isMember: boolean = false;
    if (whiteRobeCnt > 1) {
      isMember = true;
    }
    try {
      const transaction = await contract.claim(count, isMember, {
        value: amount.mul(count),
      });
      await transaction.wait();
      if (isMember) {
        enqueueSnackbar(
          "Congrates, you've got rarity Celt NFT! so you've get 5 times Falcoin"
        );
      } else {
        enqueueSnackbar("Congrates, so you've get 10000 Falcoin");
      }
      setStatus(TransactionStatus.success);
    } catch (error) {
      enqueueSnackbar("Failed");
      setStatus(TransactionStatus.fail);
    }
    await delay(5000);
    setStatus(TransactionStatus.finish);
  };

  const openOpenSea = () => {
    var win = window.open("https://testnets.opensea.io/account", "_blank");
    win?.focus();
  };

  const bottomElement = () => {
    switch (status) {
      case TransactionStatus.finish:
        return (
          <MintBtn size="large" endIcon={<ImportExportIcon />} onClick={claim}>
            Buy Celts
          </MintBtn>
        );
      case TransactionStatus.fail:
        return (
          <MessageWrapper>
            <Typography color="red" fontSize="28px">
              Failed
            </Typography>
          </MessageWrapper>
        );
      case TransactionStatus.success:
        return (
          <MessageWrapper>
            <Typography color="green" fontSize="28px">
              Success
            </Typography>
          </MessageWrapper>
        );
      default:
        return (
          <Box
            sx={{ display: "flex", justifyContent: "center", padding: "50px" }}
          >
            <CircularProgress color="secondary" />
          </Box>
        );
    }
  };

  return (
    <div>
      <MainBgImgWrapper src={MintBgImg}></MainBgImgWrapper>
      <ComponentContainer>
        <InputWrapper
          id="filled-basic"
          value={formInput.count}
          onChange={handleChange}
          autoFocus
          label="Amount"
          color="secondary"
          sx={{ input: { color: "white", notchedOutline: "white" } }}
        ></InputWrapper>
        {bottomElement()}
      </ComponentContainer>
      <div style={{ position: "absolute", top: "10px", right: "50px" }}>
        <CheckNFTBtn
          size="small"
          endIcon={<img src={OpenSeaIcon} style={{ width: 44 }} />}
          onClick={openOpenSea}
        />
      </div>
      <Footer>
        <img src={Favicon} style={{ height: "80px" }}></img>
      </Footer>
    </div>
  );
};

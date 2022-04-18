import { useBreakPoint } from "../../utils/MediaQuery";
import BgImag from "../../assets/image/home/background.svg";
import BgImagTm from "../../assets/image/home/background_tm.svg";
import { TextField, Typography, Box, Button, Slide, Grow, styled, keyframes } from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { useRef, useState } from "react";
import { delay, Utils } from "../../utils/Utils";
import { LocalizedTexts } from "../../assets/localization/localization";
import { useSnackbar } from "notistack";
import { useAppContextStore } from "../../contexts/AppContext";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CeltMinter, CeltMinterABI, Settings } from "@cryptocelts/contracts-typechain";
import { TransactionStatus } from "../../interfaces/celtMinter/TransactionStatus";
import CircularProgress from "@mui/material/CircularProgress";

export const Claim = () => {
  const match = useBreakPoint();
  const MainContainer = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    width: "100%",
  }));
  const BgSection = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    width: "100%",
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${match ? BgImag : BgImagTm})`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center",
    alignContent: "center",
    zIndex: 10,
  }));

  const ClaimBtn = styled(Button)(({ theme }) => ({
    height: "52px",
    borderRadius: "2px",
    padding: "16px 24px 16px 24px",
    marginLeft: "16px",
    "&:hover": {
      color: "red",
    },
  }));

  const blink = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

  const rotate = keyframes`
0% {
    transform: rotate( 0deg ) scale( 1 );
    color:${Utils.randomColor()};
  }
  10% {
    transform: rotate( 15deg ) scale( 1 );
  }
  50% {
    transform: rotate( -180deg ) scale( 1.4 );
    color: ${Utils.randomColor()};
  }
  80%,100% {
    transform: rotate( -360deg ) scale( 1 );
    color: ${Utils.randomColor()};
  }
`;

  const BlinkText = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.giftText.fontSize,
    textAlign: "center",
    color: theme.palette.primary.dark,
  }));

  const RotateGift = styled(CardGiftcardIcon)(({ theme }) => ({
    marginTop: "30px",
    animation: `${rotate} 3s linear infinite`,
    fontSize: "48px",
    marginBottom: "32px",
  }));

  const ClamTextField = styled(TextField)(({ theme }) => ({
    color: theme.palette.primary.dark,
    fontSize: "48px",
    marginBottom: "32px",
    "& label.Mui-focused": {
      color: "red",
    },
    "& label.Mui-required": {
      color: "red",
    },
    "& .MuiOutlinedInput-root": {
      " &.Mui-focused fieldset": {
        borderColor: "red",
        color: "red",
      },
    },
  }));

  const containerRef = useRef(null);
  const [formInput, updateFormInput] = useState({ count: 0 });
  let claimAmount: number = 0;
  const [status, setStatus] = useState(TransactionStatus.finish);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    claimAmount = +event.target.value.toString();
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

    const count = claimAmount;
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
        if (element.trait_type.toLowerCase() === "robe" && element.value.toLowerCase().includes("grey")) {
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
        enqueueSnackbar("Congrats, you've got rarity Celt NFT! so you've get 5 times Falcoin");
      } else {
        enqueueSnackbar("Congrats, so you've get 10000 Green Falcoin");
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

  return (
    <MainContainer>
      <BgSection>
        <Grow timeout={2000} in={true}>
          <BlinkText>{LocalizedTexts.claim_des}</BlinkText>
        </Grow>
        <RotateGift />
        <Box
          sx={{
            overflow: "hidden",
            marginBottom: "40vh",
          }}
          color="red"
          ref={containerRef}
        >
          <Slide timeout={1000} in={true} direction="down">
            <Typography
              pb={4}
              sx={{
                color: (theme) => theme.palette.primary.dark,
                fontSize: "24px",
              }}
            >
              Please get Celts and Green FalCoin
            </Typography>
          </Slide>
          <ClamTextField
            type="number"
            id="standard-basic"
            label="Amount"
            focused={true}
            inputProps={{ min: "0"}}
            onChange={handleChange}
          ></ClamTextField>
          <ClaimBtn
            variant="contained"
            endIcon={<CardGiftcardIcon />}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.dark,
              color: "white",
            }}
            onClick={claim}
          >
            Claim
          </ClaimBtn>
        </Box>
        {
          status == TransactionStatus.inProgress ?  <CircularProgress sx={{
            position: 'absolute',
            margin: 'auto',
            color: 'red'
          }}></CircularProgress > : null
        }
      </BgSection>
    </MainContainer>
  );
};

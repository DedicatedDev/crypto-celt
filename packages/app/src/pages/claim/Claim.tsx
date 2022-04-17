import { useBreakPoint } from "../../utils/MediaQuery";
import BgImag from "../../assets/image/home/background.svg";
import BgImagTm from "../../assets/image/home/background_tm.svg";
import { TextField, Typography, Box, Button, Slide, Grow, styled, keyframes } from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { useRef } from "react";
import { Utils } from "../../utils/Utils";
import { LocalizedTexts } from "../../assets/localization/localization";

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
          <ClamTextField type="number" id="standard-basic" label="Amount" focused={true}></ClamTextField>
          <ClaimBtn
            variant="contained"
            endIcon={<CardGiftcardIcon />}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.dark,
              color: "white",
            }}
          >
            Claim
          </ClaimBtn>
        </Box>
      </BgSection>
    </MainContainer>
  );
};

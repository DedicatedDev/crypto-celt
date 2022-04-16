import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import mainBgImg from "../assets/image/mainBg.svg";
import topLogImg from "../assets/image/mainLogo.png";
import whiteLogoImg from "../assets/image/whiteLog.png";
import Celts from "../assets/image/home/celts.png";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Favicon from "../assets/image/favicon.png";
import { useEffect } from "react";
import { CeltWeb3Service } from "../services/CeltWeb3Service";
export const Home_T = () => {
  const CeltContainer = styled("div")(({ theme }) => ({
    // position:'relative'
    marginBottom: "-50px",
  }));
  const TopBgImgWrapper = styled("img")(({ theme }) => ({
    width: "100vw",
    //position:'absolute',
  }));
  const TopLogoWrapper = styled("div")(({ theme }) => ({
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    maxWidth: "600px",
    width: "30%",
    top: "10%",
    left: "10%",
  }));

  const MiddleContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#3b6b53",
    justifyContent: "center",
    padding: "100px",
  }));

  const BottomLogoWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    maxWidth: "327px",
    paddingRight: "50px",
  }));

  const CeltImgWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    maxWidth: "630px",
    paddingLeft: "50px",
  }));

  const Footer = styled("div")(({ theme }) => ({
    backgroundColor: "#333",
    width: "100vw",
    padding: "50px",
    display: "flex",
    justifyContent: "center",
  }));

  const theme = useTheme()
  const match = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <div>
      <CeltContainer>
        <TopBgImgWrapper src={mainBgImg} />
        <TopLogoWrapper>
          <Box width={{ sm: "100px", md: "200px" }}>
            <img src={topLogImg}></img>
          </Box>
          <Typography variant="h5" color="#333">
            Scattered throughout the metaverse there are powerful and magical CryptoCelts.
          </Typography>
        </TopLogoWrapper>
      </CeltContainer>
      <MiddleContainer>
        <BottomLogoWrapper>
          <img src={whiteLogoImg} style={{ paddingTop: "50px" }}></img>
          <Typography variant="h5" color="white">
            CryptoCelts: Druids is a limited collection of randomly generated NFTs. Each druid possesses spectacular
            magic, and is able to grant its owner a special gift.
          </Typography>
        </BottomLogoWrapper>
        <CeltImgWrapper>
          <img src={Celts}></img>
        </CeltImgWrapper>
      </MiddleContainer>
      <Footer>
        <img src={Favicon} style={{ height: "80px" }}></img>
      </Footer>
    </div>
  );
};

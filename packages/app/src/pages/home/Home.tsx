import { Box, styled, Typography, Slide, keyframes } from "@mui/material";
import HeroLogoImg from "../../assets/image/home/heroLogo.png";
import BgImag from "../../assets/image/home/background.svg";
import BgImagTm from "../../assets/image/home/background_tm.svg";
import Arrow from "../../assets/image/home/arrow.svg";
import { LocalizedTexts } from "../../assets/localization/localization";
import { useTranslation } from "react-i18next";

import { FeatureContent } from "./parts/FeatureContent";
import { Celts } from "./parts/Celts";
import { FAQ } from "./parts/FAQ";
import { Footer } from "./parts/Footer";
import { useBreakPoint } from "../../utils/MediaQuery";
import { useEffect, useRef, useState } from "react";

export const Home = () => {
  const HomeContainer = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    width: "100%",
  }));

  const TopSection = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    width: "100%",
    height: `${match ? "100vh" : "auto"}`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${match ? BgImag : null})`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    zIndex: 10,
  }));

  const HeroLogoContainer = styled(Box)(({ theme }) => ({
    color: theme.palette.background.default,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "start",
    margin: `${match ? "0 0 10vh 0" : null}`,
    padding: `${match ? "0 10vh 0 10vh" : "3vh 5vw 0 5vw"}`,
  }));

  const HeroLogo = styled("img")(({ theme }) => ({
    width: "100%",
    maxWidth: "600px",
  }));

  const HeroLogoDes = styled(Typography)(({ theme }) => ({
    maxWidth: "550px",
    marginTop: "10px",
    marginBottom: "25px",
    color: theme.palette.secondary.main,
  }));

  const GapSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    padding: "10vh 0 5vh 0",
    zIndex: -100,
  }));

  const MiddleSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  }));

  const FeatureContainer = styled(Box)(({ theme }) => ({
    width: "90vw",
    padding: `${match ? "0 10vw 0 10vw" : null}`,
    margin: `${match ? "10vh 0px 10vh 0px" : "5vh 0vw 5vh 0vw"}`,
    display: "flex",
    flexDirection: "row",
    flexWrap: `${match ? null : "wrap"}`,
    justifyContent: "space-around",
    alignItems: "center",
  }));

  const FAQSection = styled(Box)(({ theme }) => ({
    padding: "10vh 10vw 10vh 10 vw",
    display: "flex",
    flexDirection: "row",
  }));

  const FootSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    padding: "10vh 10vw 10vh 10 vw",
    display: "flex",
    flexDirection: "row",
  }));

  const ArrowSection = styled("img")(({ theme }) => ({
    position: "absolute",
    top: "auto",
    bottom: "5px",
    left: 0,
    right: 0,
    margin: "auto",
    animation: `${up_down} 1s linear infinite`,
  }));

  const up_down = keyframes`
   0%, 100% {
    bottom: 0;
  }
  50% {
    bottom: 30px;
  }
`;

  const { t } = useTranslation();
  const match = useBreakPoint();
  const [show, setShow] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HomeContainer>
      <ArrowSection src={Arrow}></ArrowSection>
      <TopSection>
        <HeroLogoContainer
          padding={{
            xl: "0px 10vh 10vh 10vw",
            lg: "3vh 5vw 0px 5vw",
            md: "3vh 5vw 5vh 5vw",
            sm: "3vh 5vw 5vh 5vw",
          }}
        >
          <Slide
            in={show}
            direction="up"
            timeout={2000}
            easing={{
              enter: "cubic-bezier(0, 1.5, .8, 1)",
              exit: "linear",
            }}
          >
            <HeroLogo src={HeroLogoImg}></HeroLogo>
          </Slide>
          <Slide
            in={show}
            direction="up"
            timeout={2000}
            easing={{
              enter: "cubic-bezier(0, 1.5, .8, 1)",
              exit: "linear",
            }}
          >
            <HeroLogoDes color="CaptionText" variant="h3">
              {t(LocalizedTexts.hero_logo_des)}
            </HeroLogoDes>
          </Slide>
        </HeroLogoContainer>
        {match ? null : <img src={BgImagTm} />}
      </TopSection>
      <GapSection />
      <MiddleSection>
        <FeatureContainer>
          <FeatureContent></FeatureContent>
          <Celts></Celts>
        </FeatureContainer>
      </MiddleSection>
      <FAQSection>
        <FAQ></FAQ>
      </FAQSection>
      <FootSection>
        <Footer></Footer>
      </FootSection>
    </HomeContainer>
  );
};

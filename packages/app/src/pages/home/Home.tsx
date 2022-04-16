import { Box, Container, Hidden, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { height, margin, padding } from "@mui/system";
import HeroLogoImg from "../../assets/image/home/heroLogo.png";
import BgImag from "../../assets/image/home/background.svg";
import BgImagTm from "../../assets/image/home/background_tm.svg";
import { LocalizedTexts } from "../../assets/localization/localization";
import { useTranslation } from "react-i18next";

import { FeatureContent } from "./parts/FeatureContent";
import { Celts } from "./parts/Celts";
import {FAQ} from "./parts/FAQ";

export const Home = () => {
  const HomeContainer = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    width: "100%",
  }));

  const TopSection = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    width: "100%",
    height: `${match ? "auto" : "100vh"}`,
    padding: "10vh 0 5vh 0",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${match ? "" : BgImagTm})`,
    display: "flex",
    flexDirection: "column",
    zIndex: 10
  }));

  const HeroLogoContainer = styled(Box)(({ theme }) => ({
    color: theme.palette.background.default,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    alignContent: "start",
    margin: "auto",
  }));

  const HeroLogo = styled("img")(({ theme }) => ({
    width: "100%",
    maxWidth: "600px",
  }));

  const HeroLogoDes = styled(Typography)(({ theme }) => ({
    maxWidth: "550px",
    marginTop: "10px",
    marginBottom: "25px",
  }));


  const GapSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    padding: "10vh 0 5vh 0",
    zIndex: -100,
  }));

  const MiddleSection = styled(Box)(({ theme }) => ({
    backgroundColor:  theme.palette.primary.dark,
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
  }));

  const FeatureContainer = styled(Container)(({ theme }) => ({
    width: '90vw',
    margin: `${match ? '10vh 10vw 10vh 10vw' : '5vh 0vw 5vh 0vw'}`,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  }));

  const FAQSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    padding: "10vh 10vw 10vh 10 vw",
    display: "flex",
    flexDirection: "row",
  }));

  const { t } = useTranslation();
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <HomeContainer>
      <TopSection>
        <HeroLogoContainer
          padding={{
            xl: "0px 10vh 10vh 10vw",
            lg: "3vh 5vw 0px 5vw",
            md: "3vh 5vw 5vh 5vw",
            sm: "3vh 5vw 5vh 5vw",
          }}
        >
          <HeroLogo src={HeroLogoImg}></HeroLogo>
          <HeroLogoDes color="CaptionText" variant="h3">
            {t(LocalizedTexts.hero_logo_des)}
          </HeroLogoDes>
        </HeroLogoContainer>
        {!match ? null : <img src={BgImag}></img>}
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
    </HomeContainer>
  );
};

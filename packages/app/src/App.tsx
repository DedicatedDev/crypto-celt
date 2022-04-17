import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from "react-router-dom";
//import { Minter } from "./pages/CeltMinter";
import { Home } from "./pages/home/Home";
import { MoralisProvider } from "react-moralis";
import { useSnackbar } from "notistack";

import MainNavTabs from "./components/MainNavTabs";
//import { MyNFTs } from "./pages/MyNFTs";
import { CeltWeb3Service } from "./services/CeltWeb3Service";
import { useAppContextStore } from "./contexts/AppContext";
import * as setting from "./config";
import { styled, Typography, useTheme } from "@mui/material";
import { fontSize, fontWeight, keyframes, margin, padding } from "@mui/system";
import { Claim } from "./pages/claim/Claim";

function App() {
  const HeaderContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    maxHeight: "44px",
    width: "100%",
    padding: "24px 20px 16px 0",
    justifyContent: "flex-end",
    alignItems: "center",
  }));

  const blink = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
  //const theme = useTheme();

  // const BlinkText = styled(Typography)(({ theme }) => ({
  //   color: "red",
  //   animation: `${blink} 1s linear infinite`,
  // }));

  // const NavText = styled(Typography)({
  //   color: `${theme.palette.primary.dark}`,
  //   fontWeight: "bold",
  //   fontSize: "20px",
  // });

  const RouteLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.primary.main,

    "&:active": {
      color: "red",
    },
    fontSize: theme.typography.nav.fontSize,
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  }));
  const tm = useTheme();
  return (
    <MoralisProvider
      serverUrl="https://7vxzxohekam2.usemoralis.com:2053/server"
      appId="GMafLqATIP99mRmaBmYErrySCb4FJ4aJMU45S3BT"
    >
      <Router>
        <HeaderContainer>
          <RouteLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? tm.palette.primary.dark : tm.palette.primary.main,
              paddingRight: '20px'
            })}
          >
            Home
          </RouteLink>
          <RouteLink
            to="/claim"
            style={({ isActive }) => ({
              color: isActive ? tm.palette.primary.dark : tm.palette.primary.main,
              paddingRight: '20px',
              "&:active": {
                color: "red",
              },
            })}
          >
            Claim
          </RouteLink>

          <RouteLink
            to="/my_nfts"
            style={({ isActive }) => ({
              color: isActive ? tm.palette.primary.dark : tm.palette.primary.main,
              "&:active": {
                color: "red",
              },
            })}
          >
            My Nfts
          </RouteLink>

          {/* <NavLink to="/claim" style={{ textDecoration: "none" }}>
            <NavText pl={2} color={theme.palette.primary.dark}>
              Claim
            </NavText>
          </NavLink>
          <NavLink to="/my_nft" style={{ textDecoration: "none" }}>
            <NavText pl={2}>My NFTs</NavText>
          </NavLink> */}
        </HeaderContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/claim" element={<Claim />} /> 
          {/* <Route path="/myNfts" element={<MyNFTs />} />*/}
        </Routes>
      </Router>
    </MoralisProvider>
  );
}

export default App;

import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from "react-router-dom";
//import { Minter } from "./pages/CeltMinter";
import { Home } from "./pages/home/Home";
import { MoralisProvider } from "react-moralis";
import { useSnackbar } from "notistack";

import * as setting from "./config";
import { styled, Typography, useTheme } from "@mui/material";
import { keyframes } from "@mui/system";
import { Claim } from "./pages/claim/Claim";
import { MyAssets } from "./pages/my_assets/MyAssets";
import { OpenSea } from "./pages/opensea/OpenSea";

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
            to="/my_assets"
            style={({ isActive }) => ({
              color: isActive ? tm.palette.primary.dark : tm.palette.primary.main,
              "&:active": {
                color: "red",
              },
              paddingRight: '20px',
            })}
          >
            My Assets
          </RouteLink>
          <RouteLink
            to="/opensea"
            style={({ isActive }) => ({
              color: isActive ? tm.palette.primary.dark : tm.palette.primary.main,
              "&:active": {
                color: "red",
              },
            })}
          >
            OpenSea
          </RouteLink>
        </HeaderContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/claim" element={<Claim />} /> 
          <Route path="/my_assets" element={<MyAssets />} />
          <Route path="/opensea" element={<OpenSea />} />
        </Routes>
      </Router>
    </MoralisProvider>
  );
}

export default App;

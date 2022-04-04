import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { Minter } from "./pages/CeltMinter";
import { Home } from "./pages/Home";
import { MoralisProvider } from "react-moralis";
import { useSnackbar } from "notistack";
import styled from "@emotion/styled";
import MainNavTabs from "./components/MainNavTabs";
import { MyNFTs } from "./pages/MyNFTs";
import { CeltWeb3Service } from "./services/CeltWeb3Service";
import { useAppContextStore } from "./contexts/AppContext";
import * as setting from "./config";


function App() {

  const HeaderContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    maxHeight: "68px",
    width: "100%",
    paddingTop:'16px',
    justifyContent: "center",
    alignItems: "center",
  }));

  return (
    <MoralisProvider serverUrl="https://7vxzxohekam2.usemoralis.com:2053/server" appId="GMafLqATIP99mRmaBmYErrySCb4FJ4aJMU45S3BT">
      <Router>
        <HeaderContainer>
            <MainNavTabs></MainNavTabs>
        </HeaderContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myNfts" element={<MyNFTs />} />
          <Route path="/claim" element={<Minter />} />
        </Routes>
      </Router>
    </MoralisProvider>
    
  );
}

export default App;

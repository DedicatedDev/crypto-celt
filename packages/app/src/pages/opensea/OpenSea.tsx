import { Box } from "@mui/material";
import Iframe from "react-iframe";
export const OpenSea = () => {
  return (
    <Iframe
      url="https://testnets.opensea.io/account"
      position="absolute"
      width="100%"
      id="myId"
      height="100%"
      styles={{ height: "25px", border: 'none' }}
    />
  );
};

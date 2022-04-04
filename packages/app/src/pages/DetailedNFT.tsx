import { Typography } from "@mui/material";
import { styled, width } from "@mui/system";
import React from "react";
import { NFTCardProps } from "../interfaces/props/NFTCardProps";

export const DetailedNFT = ({ nft }: NFTCardProps) => {
  const MainContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    
  }));
  const [metaData, setMetaData] = React.useState<any|undefined>();
  React.useEffect(() => {
    const meta = JSON.parse(nft.metadata);
    setMetaData(meta);
    return () => {};
  }, [nft]);
  return (
    <>
      <img src={metaData?.token_id}></img>
      <Typography>{metaData?.contract_type}</Typography>
      <Typography>{metaData?.token_address}</Typography>
      <Typography>{metaData?.token_address}</Typography>
    </>
  );
};

import { Box, Typography } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/system";
import { NFTCardProps } from "../interfaces/props/NFTCardProps";
import { ThreeMpOutlined } from "@mui/icons-material";
import { NFTCardItem } from "./NFTCardItem";

export const NFTCard = ({ nft }: NFTCardProps) => {
  const Container = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    border: "solid 2px",
    borderColor: "#666666",
    padding: theme.spacing(1),
    //backgroundColor: "#666666",
    borderRadius: theme.spacing(1),
  }));
  const [metaData, setMetaData] = React.useState<any | undefined>({
    image: "",
    name: "",
  });
  React.useEffect(() => {
    const meta = JSON.parse(nft.metadata);
    setMetaData(meta);
    return () => {};
  }, [nft]);
  return (
    <Container>
      <img
        src={
          metaData?.image ||
          "https://cdn.pixabay.com/photo/2015/12/22/04/00/photo-1103595_960_720.png"
        }
        width="100%"
      />
      <NFTCardItem name="Name" value={metaData?.name} direction="row"/>
      <NFTCardItem name="Token Id" value={nft.token_id} direction="row" />
      <NFTCardItem name="Token URI" value={nft.token_uri} direction="column" />
      <NFTCardItem name="Token Contract Address" value={nft.token_address} direction="column" />
      <NFTCardItem name="Description" value={metaData?.description} direction="column"/>

    </Container>
  );
};

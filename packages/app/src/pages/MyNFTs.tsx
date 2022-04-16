import { styled, width } from "@mui/system";
import { Button, Icon, IconButton, TextField, Typography } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { useEffect, useState, useRef, useMemo } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CeltMinterABI } from "@cryptocelts/contracts-typechain";
import MintBgImg from "../assets/image/mintBgImg.png";
import Favicon from "../assets/image/favicon.png";
import { Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { delay, getEnumKeyByEnumValue } from "../utils/Utils";
import { CeltWeb3Service } from "../services/CeltWeb3Service";
import { useAppContextStore } from "../contexts/AppContext";
import { NFTCard } from "../components/NFTCard";
import { Settings } from "@cryptocelts/contracts-typechain";
import { HailSharp, Search } from "@mui/icons-material";
import {
  AppBar,
  Paper,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { NFTOwner, Robs } from "../interfaces/my_nfts/FilterTrait";
import { TokenInfo } from "../interfaces/Nft";
import { NFTCardItem } from "../components/NFTCardItem";


export const MyNFTs = () => {
  const MainBgImgWrapper = styled("img")(({ theme }) => ({
    width: "100vw",
    zIndex: -1,
    //marginBottom:'-10px'
  }));

  const FilterContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
  }));

  const FitlerItemContainer = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: "solid, 1px",
    borderColor: "#33333333",
  }));

  const Footer = styled("div")(({ theme }) => ({
    backgroundColor: "#333",
    width: "100vw",
    padding: "50px",
    display: "flex",
    justifyContent: "center",
  }));

  const TitleContainer = styled(Typography)(({ theme }) => ({
    paddingLeft: "44px",
    paddingTop: "15px",
    paddingBottom: "15px",
    fontSize: "20px",
    backgroundColor: "#44DD4433",
  }));

  const [filteredTokens, setFilteredTokens] = useState<TokenInfo[]>([]);
  const [filterOptions, setFilterOption] = useState({
    owners: new Set<NFTOwner>(),
    robs: new Set<Robs>(),
    query: "",
  });
  const [tokenBalances, setTokenBalances] = useState<any[]>([]);
  const [falCoin, setFalCoin] = useState(0);
  const { allTokens, setTokens } = useAppContextStore();

  const fetchNFTs = async () => {
    const nfts = await CeltWeb3Service.fetchAllNFTs("rinkeby");
    setTokens(nfts);
  };

  useEffect(() => {
    void fetchNFTs();
    return () => {};
  }, []);

  useEffect(() => {
    void getTokens();
    let filteredTokens: TokenInfo[] = [];
    if (Array.from(filterOptions.owners).length == 0) {
      filteredTokens = filteredTokens
        .concat(allTokens.celts)
        .concat(allTokens.others);
    } else {
      Array.from(filterOptions.owners).map((item) => {
        switch (item) {
          case NFTOwner.celts:
            filteredTokens = filteredTokens.concat(allTokens.celts);
            break;
          case NFTOwner.other:
            filteredTokens = filteredTokens.concat(allTokens.others);
            break;
          default:
            break;
        }
      });
    }
    let tokens: TokenInfo[] = [];
    if (Array.from(filterOptions.robs).length == 0) {
      tokens = filteredTokens;
    } else {
      Array.from(filterOptions.robs).map((item) => {
        let fetchedItems: TokenInfo[] = [];
        switch (item) {
          case Robs.unknown:
            break;
          default:
            fetchedItems = filteredTokens.filter((nftItem) => {
              const metadata = JSON.parse(nftItem?.metadata);
              const attributes = metadata?.attributes ?? [];
              const hasProps =
                attributes.filter(
                  (element: any) =>
                    element.trait_type.toLowerCase() === "robe" &&
                    element.value.toLowerCase().includes(item)
                ) ?? [];
              return hasProps.length > 0;
            });
            console.log(fetchedItems);
            break;
        }
        console.log(fetchedItems);
        if (fetchedItems.length > 0) {
          tokens = tokens.concat(fetchedItems);
        }
      });
    }

    if (filterOptions?.query !== null && filterOptions?.query !== "") {
      tokens = tokens.filter((item) => {
        const metadata = JSON.parse(item?.metadata ?? "{}");
        return (metadata?.name ?? "")
          .toLowerCase()
          .includes(filterOptions.query.toLowerCase());
      });
    }
    setFilteredTokens(tokens);
    return () => {};
  }, [filterOptions]);

  const getTokens = async () => {
    try {
      const balances = await CeltWeb3Service.fetchGreenFalCoinBalance(
        "rinkeby"
      );
      const falCoin = balances.filter(
        (item) => item.token_address === Settings.greenFalcoinAddress.toLowerCase()
      );
      if (falCoin.length != 0) {
        setFalCoin(falCoin[0].balance);
      }
      setTokenBalances(balances);
    } catch (error) {
      console.log(error);
    }
  };
  const robs = Object.keys(Robs).filter((item) => {
    return isNaN(Number(item));
  });

  const handleOwnerCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case NFTOwner.celts.toString():
        console.log("celts");
        if (!filterOptions.owners.has(NFTOwner.celts)) {
          const newItem = filterOptions.owners.add(NFTOwner.celts);
          console.log("here?");
          setFilterOption((prev) => ({
            ...prev,
            owners: newItem,
          }));
        } else {
          console.log("there?");
          let newItem = filterOptions.owners;
          newItem.delete(NFTOwner.celts);
          setFilterOption((prev) => ({
            ...prev,
            owners: newItem,
          }));
        }
        break;
      case NFTOwner.other.toString():
        if (!filterOptions.owners.has(NFTOwner.other)) {
          const newItem = filterOptions.owners.add(NFTOwner.other);
          setFilterOption((prev) => ({
            ...prev,
            owners: newItem,
          }));
        } else {
          let newItem = filterOptions.owners;
          newItem.delete(NFTOwner.other);
          setFilterOption((prev) => ({
            ...prev,
            owners: newItem,
          }));
        }
        break;
      default:
        if (
          robs.map((item) => item.toLocaleLowerCase()).includes(e.target.id)
        ) {
          const rob = getEnumKeyByEnumValue(Robs, e.target.id)!;
          if (!filterOptions.robs.has(Robs[rob])) {
            const newItem = filterOptions.robs.add(Robs[rob]);
            console.log(newItem);
            setFilterOption((prev) => ({
              ...prev,
              robs: newItem,
            }));
          } else {
            let newItem = filterOptions.robs;
            newItem.delete(Robs[rob]);
            setFilterOption((prev) => ({
              ...prev,
              robs: newItem,
            }));
          }
        }
        break;
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOption((prev) => ({
      ...prev,
      query: event.target.value.toString(),
    }));
  };

  return (
    <div>
      <Box sx={{ display: "flex" }} paddingBottom={4}>
        <Stack
          minWidth={300}
          spacing={2}
          sx={{
            margin: "44px",
          }}
        >
          <TextField
            size="small"
            placeholder="Search Nfts from your wallet"
            InputProps={{ startAdornment: <Search color="inherit" /> }}
            value={filterOptions.query}
            onChange={handleSearchChange}
          />
          <FitlerItemContainer>
            <Typography variant="h6">NFT Type</Typography>
            <FormControlLabel
              label="Celts"
              control={
                <Checkbox
                  id={NFTOwner.celts.toString()}
                  checked={filterOptions.owners.has(NFTOwner.celts)}
                  onChange={(e) => handleOwnerCheckBox(e)}
                />
              }
            />
            <FormControlLabel
              label="Others"
              control={
                <Checkbox
                  id={NFTOwner.other.toString()}
                  checked={filterOptions.owners.has(NFTOwner.other)}
                  onChange={(e) => handleOwnerCheckBox(e)}
                />
              }
            />
          </FitlerItemContainer>
          <FitlerItemContainer>
            <Typography variant="h6">Rob</Typography>
            {robs.map((item) => {
              return (
                <FormControlLabel
                  label={item}
                  control={
                    <Checkbox
                      id={item.toString().toLowerCase()}
                      checked={filterOptions.robs.has(
                        Robs[
                          getEnumKeyByEnumValue(
                            Robs,
                            item.toString().toLowerCase()
                          )!
                        ]
                      )}
                      onChange={(e) => handleOwnerCheckBox(e)}
                    />
                  }
                />
              );
            })}
          </FitlerItemContainer>
          <FitlerItemContainer>
            <Typography variant="h6">Token Balance</Typography>
            {tokenBalances.map((item) => {
              return (
                <NFTCardItem
                  name={item?.balance ?? "0"}
                  value={item?.symbol ?? "UNKWON"}
                  direction="row"
                ></NFTCardItem>
              );
            })}
          </FitlerItemContainer>
        </Stack>
        <Box paddingTop={4} width="100%">
          <NFTCardItem
            name={`Total NFTS : ${filteredTokens.length}`}
            value={`${falCoin} Fal`}
            direction="row"
          ></NFTCardItem>
          <Grid container spacing={4}>
            {filteredTokens.map((nft, index) => {
              return (
                <Grid item xs={4} key={index}>
                  <NFTCard nft={nft}></NFTCard>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>

      <Footer>
        <img src={Favicon} style={{ height: "80px" }}></img>
      </Footer>
    </div>
  );
};

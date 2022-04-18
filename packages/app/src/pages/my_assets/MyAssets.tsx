import { useBreakPoint } from "../../utils/MediaQuery";
import BgImag from "../../assets/image/home/background.svg";
import BgImagTm from "../../assets/image/home/background_tm.svg";
import { TextField, Typography, Box, Grow, styled, keyframes, Grid } from "@mui/material";
import { Search } from "@mui/icons-material";
import { CeltWeb3Service } from "../../services/CeltWeb3Service";
import { useEffect, useState, useRef, useMemo } from "react";

import { Paper, Stack, Checkbox, FormControlLabel } from "@mui/material";

import { NFTOwner, Robs } from "../../interfaces/my_nfts/FilterTrait";
import { getEnumKeyByEnumValue, Utils } from "../../utils/Utils";
import { LocalizedTexts } from "../../assets/localization/localization";
import { TokenInfo } from "../../interfaces/Nft";
import { NFTCardItem } from "../../components/NFTCardItem";
import { useAppContextStore } from "../../contexts/AppContext";
import { Settings } from "@cryptocelts/contracts-typechain";
import { NFTCard } from "../../components/NFTCard";
import { useTheme } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";

export const MyAssets = () => {
  const match = useBreakPoint();
  const MainContainer = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    width: "100%",
  }));
  const BgSection = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    width: "100%",
    backgroundSize: "cover",
    backgroundImage: `url(${match ? BgImag : BgImagTm})`,
    display: "flex",
    flexDirection: "column",
    zIndex: 10,
  }));

  const CheckItem = styled(FormControlLabel)(({ theme }) => ({
    color: theme.palette.primary.dark,
    padding: "8px",
  }));

  const FilterItemContainer = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: "solid, 1px",
    borderColor: "#33333333",
  }));

  const blink = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

  const rotate = keyframes`
0% {
    transform: rotate( 0deg ) scale( 1 );
    color:${Utils.randomColor()};
  }
  10% {
    transform: rotate( 15deg ) scale( 1 );
  }
  50% {
    transform: rotate( -180deg ) scale( 1.4 );
    color: ${Utils.randomColor()};
  }
  80%,100% {
    transform: rotate( -360deg ) scale( 1 );
    color: ${Utils.randomColor()};
  }
`;

  const SearchTextField = styled(TextField)({
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 1,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 1,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 1,
    },
  });

  const tm = useTheme();
  const [filteredTokens, setFilteredTokens] = useState<TokenInfo[]>([]);
  const [filterOptions, setFilterOption] = useState({
    owners: new Set<NFTOwner>(),
    robs: new Set<Robs>(),
    query: "",
  });
  const [tokenBalances, setTokenBalances] = useState<any[]>([]);
  const [falCoin, setFalCoin] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const { allTokens, setTokens } = useAppContextStore();

  const fetchNFTs = async () => {
    setLoading(true);
    const nfts = await CeltWeb3Service.fetchAllNFTs("rinkeby");
    setLoading(false);
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
      filteredTokens = filteredTokens.concat(allTokens.celts).concat(allTokens.others);
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
                    element.trait_type.toLowerCase() === "robe" && element.value.toLowerCase().includes(item)
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
        return (metadata?.name ?? "").toLowerCase().includes(filterOptions.query.toLowerCase());
      });
    }
    setFilteredTokens(tokens);
    return () => {};
  }, [filterOptions, allTokens]);

  const getTokens = async () => {
    try {
      const balances = await CeltWeb3Service.fetchGreenFalCoinBalance("rinkeby");
      const falCoin = balances.filter((item) => item.token_address === Settings.greenFalcoinAddress.toLowerCase());
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
        if (robs.map((item) => item.toLocaleLowerCase()).includes(e.target.id)) {
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
    <MainContainer>
      <BgSection>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: `${match ? null : "wrap"}`,
          }}
          pl={4}
        >
          <Stack minWidth={match ? 300 : "85vw"} spacing={4} mt={3}>
            <SearchTextField
              size="small"
              placeholder="Search Nfts from your wallet"
              InputProps={{ startAdornment: <Search color="primary" /> }}
              value={filterOptions.query}
              onChange={handleSearchChange}
              autoFocus
              inputProps={{ style: { color: `${tm.palette.text.secondary}` } }}
            />
            <FilterItemContainer>
              <Typography variant="h6" color="primary">
                NFT Type
              </Typography>
              <CheckItem
                label="Celts"
                control={
                  <Checkbox
                    id={NFTOwner.celts.toString()}
                    checked={filterOptions.owners.has(NFTOwner.celts)}
                    onChange={(e) => handleOwnerCheckBox(e)}
                  />
                }
              />
              <CheckItem
                label="Others"
                control={
                  <Checkbox
                    id={NFTOwner.other.toString()}
                    checked={filterOptions.owners.has(NFTOwner.other)}
                    onChange={(e) => handleOwnerCheckBox(e)}
                  />
                }
              />
            </FilterItemContainer>
            <FilterItemContainer>
              <Typography variant="h6" color="primary">
                Rob
              </Typography>
              {robs.map((item) => {
                return (
                  <CheckItem
                    label={item}
                    control={
                      <Checkbox
                        id={item.toString().toLowerCase()}
                        checked={filterOptions.robs.has(
                          Robs[getEnumKeyByEnumValue(Robs, item.toString().toLowerCase())!]
                        )}
                        onChange={(e) => handleOwnerCheckBox(e)}
                      />
                    }
                  />
                );
              })}
            </FilterItemContainer>
            <FilterItemContainer>
              <Typography variant="h6" color="primary">
                Token Balance
              </Typography>
              {tokenBalances.map((item) => {
                return (
                  <NFTCardItem
                    name={item?.balance ?? "0"}
                    value={item?.symbol ?? "UNKWON"}
                    direction="row"
                  ></NFTCardItem>
                );
              })}
            </FilterItemContainer>
          </Stack>
          <Box padding={2} width="100%">
            <NFTCardItem
              name={`Total NFTS : ${filteredTokens.length}`}
              value={`${falCoin} Fal`}
              direction="row"
            ></NFTCardItem>
            <Box
              display="flex"
              sx={{
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              {filteredTokens.map((nft, index) => {
                return <NFTCard nft={nft}></NFTCard>;
              })}
            </Box>
          </Box>
        </Box>
        {isLoading ? (
          <Box
            display="flex"
            sx={{
              position: "absolute",
              width: "100vw",
              height: "100vh",
              backgroundColor: "#44444444",
            }}
          >
            <CircularProgress
              sx={{
                margin: "auto",
                color: "red",
              }}
            ></CircularProgress>
          </Box>
        ) : null}
      </BgSection>
    </MainContainer>
  );
};

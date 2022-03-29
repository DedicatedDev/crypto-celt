# CryptoCelts

CryptoCelts is an NFT series created by Mintroad to grow our presence in the community. 
Druids, or CrytoCelts: Druids are the first characters to mint on Polygon and sell on OpenSea.

## Background

This work stems from 2021, and the ecosystem has since expanded. The following YouTube playlist was released after
our initial prototype:

https://youtube.com/playlist?list=PLkwxH9e_vrAI-654ymN4JDhMmMUge04WK

## Instructions

Although these steps can be automated further, the piecemeal nature can be handy for manual checks along the way. Run the commands from the root of this project.

## 1. Pre-requisites

  - Create designs
  - Create a rarity table
  - Export layers tab of rarity Google Sheet
  - Export designs

  See ***link to wiki

### Poetry

```shell
brew install poetry 

poetry install
```

### Deno

```shell
brew install deno

# You should save according to your shell.
alias drake="deno run --import-map ./import_map.json -A Drakefile.ts"
```

## 2. Convert layer rarity CSV to JSON

The project we leveraged requires JSON input. A quick utility task is used to convert our sheet:

```shell
drake convert-layers-csv layersCsvPath=input-rarity-table.csv outputJsonPath=assets/layers.json
```

You can commit `layers.json`.

## 3. Generate metadata

```shell
drake generate-metadata count=8888

# For Testnet
drake generate-metadata count=8888 fakeImage=true
```

---

## TBD

```
## 4. Create execution sheet template

This is complete, but needs to be tweaked

## 5. Upload to Google Shared Drive

These steps require calls to NFTPort:

## 6. Run IPFS job
## 7. Run minting job

We prototyped:

## 8. Configure collection on OpenSea
## 9. Run listing lob or list manually
```



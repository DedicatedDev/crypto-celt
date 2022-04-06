import fs from "fs";

import { CarIndexedReader } from "@ipld/car";
import { packToFs } from "ipfs-car/pack/fs";
import { NFTStorage } from "nft.storage";

const buildDir = "./src/generator/build";
const settingsPath = "../contracts-typechain/settings/settings.json";

export const uploadToStorage = async (input, output) => {
  console.log("upload start....");
  const storage = new NFTStorage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDc3MDNkQjQ2MTAyYTc0MjRmRDE0ODI5OTk1MjVkOENDOEExZkNDMTciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NjU5ODYwNzcwMywibmFtZSI6IkNlbHRzIn0.CSP3wc6P-EgkILqJiX0o3DdYW9L4Rp2prB4StetitMY",
  });
  // locally chunk'n'hash the file to get the CID and pack the blocks in to a CAR
  const { root } = await packToFs({
    input: input,
    output: output,
  });
  const expectedCid = root.toString();
  const carReader = await CarIndexedReader.fromFile(output);

  //   // send the CAR to nft.storage, the returned CID will match the one we created above.
  const cid = await storage.storeCar(carReader);

  //   // verify the service stored the CID we expected
  const cidsMatch = expectedCid === cid;
  console.log({ cid, expectedCid, cidsMatch });

  //   // check that the CID is pinned
  const status = await storage.status(cid);
  console.log("image upload end....");
  return status.cid;
  // Delete car file created
  // await fs.promises.rm(`${process.cwd()}/output.car`)
};

const updateImageLink = (cid, count) => {
  for (let index = 0; index < count; index++) {
    const padded = (index + 1).toString();
    const rowData = fs.readFileSync(`${buildDir}/metadata/${padded}.json`);
    const data = JSON.parse(rowData);
    data.image = `https://${cid}.ipfs.nftstorage.link/images/${padded}.png`;
    fs.writeFileSync(`${buildDir}/metadata/${padded}.json`, JSON.stringify(data));
  }
};

export const prepareResources = async () => {
  const imgCid = await uploadToStorage(`${buildDir}/images`, `${buildDir}/images.car`);
  const files = fs.readdirSync(`${buildDir}/images`).length;
  updateImageLink(imgCid, files);
  const metadataCid = await uploadToStorage(`${buildDir}/metadata/`, `${buildDir}/metadata.car`);
  let data = {};
  if (!fs.existsSync(settingsPath)) {
    fs.mkdirSync(settingsPath);
  } else {
    const rawdata = fs.readFileSync(settingsPath);
    data = JSON.parse(rawdata);
  }
  data.tokenUri = `https://${metadataCid}.ipfs.nftstorage.link/metadata/`;
  fs.writeFileSync(`${settingsPath}`, JSON.stringify(data), "utf-8");
};
await prepareResources();

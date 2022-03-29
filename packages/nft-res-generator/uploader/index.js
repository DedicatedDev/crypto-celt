import { NFTStorage, File } from "nft.storage";

import fs from "fs";
import { packToFs } from "ipfs-car/pack/fs";
import { CarIndexedReader } from "@ipld/car";

export const uploadToIPFS = async (input,output) => {
  console.log("Hello");
  const storage = new NFTStorage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEYzZTZCOEVmNjAwRjNGZjc2MGNFMDBGNjlFNjUyMEE4NDA3OTI0YzYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0ODUxNTg5NzUyNSwibmFtZSI6ImNyeXB0b2NlbHRzIn0.Y3j0tBaQq9xT496zYIlJJR0-k4pcGO-pacDkAgKPLCw",
  });
  // locally chunk'n'hash the file to get the CID and pack the blocks in to a CAR
  const { root } = await packToFs({
    input: input,
    output: output,
  });
  console.log(root);
  const expectedCid = root.toString();
  console.log({ expectedCid });
  // //   // Create the car reader
  const carReader = await CarIndexedReader.fromFile(
    "./generator/build/images.car"
  );
  console.log("go");
  //   // send the CAR to nft.storage, the returned CID will match the one we created above.
  const cid = await storage.storeCar(carReader);

  //   // verify the service stored the CID we expected
  const cidsMatch = expectedCid === cid;
  console.log({ cid, expectedCid, cidsMatch });

  //   // check that the CID is pinned
  const status = await storage.status(cid);
  return status.cid
  // Delete car file created
  //await fs.promises.rm(`${process.cwd()}/output.car`)
};

const updateImageLink = (cid,count) => {    
    for (let index = 0; index < 99; index++) {
        const rowData = fs.readFileSync(`./metadata/${index+1}.json`)
        const data = JSON.parse(rowData)
        const formatLen = count.toString().length()
        data.image = `https://${cid}.ipfs.nftstorage.link/images/${(index+1).toString(formatLen)}.png`
        fs.writeFileSync(`./metadata/${index+1}.json`,JSON.stringify(data))
    }
}

const perpareResources = async() => {
  const imgCid = await uploadToIPFS("./generator/build/images/","./generator/build/images.car");
  updateImageLink(cid)
  const metadataCid = await uploadToIPFS("./generator/build/metadata/","./generator/build/metadata.car");
}

perpareResources()

import { NFTStorage, File } from "nft.storage";

import fs from "fs";
import { packToFs } from "ipfs-car/pack/fs";
import { CarIndexedReader } from "@ipld/car";

export const uploadToIPFS = async () => {
  console.log("Hello");
  const storage = new NFTStorage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEYzZTZCOEVmNjAwRjNGZjc2MGNFMDBGNjlFNjUyMEE4NDA3OTI0YzYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0ODUxNTg5NzUyNSwibmFtZSI6ImNyeXB0b2NlbHRzIn0.Y3j0tBaQq9xT496zYIlJJR0-k4pcGO-pacDkAgKPLCw",
  });
  // locally chunk'n'hash the file to get the CID and pack the blocks in to a CAR
  const { root } = await packToFs({
    input: "./generator/build/images/",
    output: "./generator/build/images.car",
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
  console.log(status);

  // Delete car file created
  //await fs.promises.rm(`${process.cwd()}/output.car`)
};
uploadToIPFS();

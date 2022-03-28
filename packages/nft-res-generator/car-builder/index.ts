import fs from "fs";
import { packToStream } from "ipfs-car/pack/stream";
import { FsBlockStore } from "ipfs-car/blockstore/fs";


export const makeCar = async (filename:string, path:string) => {
  const writable = fs.createWriteStream(`./build/${filename}.car`);
  await packToStream({
    input: path,
    writable,
    blockstore: new FsBlockStore(),
  });
};
makeCar("test","../generator/build/images")

import fs from "fs";
import { packToStream } from "ipfs-car/pack/stream";
import { FsBlockStore } from "ipfs-car/blockstore/fs";
import { Url } from "url";

export const makeCar = async (filename:string, path:string) => {
  const writable = fs.createWriteStream(`./build/${filename}.car`);
  await packToStream({
    input: path,
    writable,
    blockstore: new FsBlockStore(),
  });
};

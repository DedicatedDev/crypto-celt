import { appendFileSync, existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";

import {} from "../../contracts-typechain";
export const saveDeployedAddress = async (celtMinter: string, greenFalcoin: string) => {
  appendFileSync("./.env", `\nAPP_ADDRESS=${celtMinter} ${greenFalcoin}`);
  const settingInfo = {
    tokenUri: "",
    celtMinterAddress: "",
    greenFalcoinAddress: "",
  };
  settingInfo.celtMinterAddress = celtMinter;
  settingInfo.greenFalcoinAddress = greenFalcoin;

  const settingsPath = "../../contracts-typechain/typechain/settings/settings.json";
  if (!existsSync(settingsPath)) {
    mkdirSync(settingsPath);
  } else {
    const rawData = readFileSync(settingsPath);
    const data = JSON.parse(rawData.toString());
    settingInfo.tokenUri = data.tokenUri;
  }
  const json = JSON.stringify(settingInfo);
  writeFileSync(settingsPath, json, "utf-8");
};

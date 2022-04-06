import { appendFileSync, existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";

export const saveDeployedAddress = async (celtMinter: string, greenFalcoin: string) => {
  appendFileSync("./.env", `\nAPP_ADDRESS=${celtMinter} ${greenFalcoin}`);
  const settingInfo = {
    tokenUri: "",
    celtMinterAddress: "",
    greenFalcoinAddress: "",
  };
  settingInfo.celtMinterAddress = celtMinter;
  settingInfo.greenFalcoinAddress = greenFalcoin;

  const settingsPath = "../contracts-typechain/settings";
  if (!existsSync(settingsPath)) {
     mkdirSync(settingsPath,{recursive: true});
  } else {
    const rawData = readFileSync(`${settingsPath}/settings.json`);
    const data = JSON.parse(rawData.toString());
    settingInfo.tokenUri = data.tokenUri;
  }
  const json = JSON.stringify(settingInfo);
  writeFileSync(`${settingsPath}/settings.json`, json, "utf-8");
};

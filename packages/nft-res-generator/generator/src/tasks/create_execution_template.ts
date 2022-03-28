import { median, sum } from "https://cdn.skypack.dev/simple-statistics";
import {
  dirname,
  fromFileUrl,
  join,
  resolve,
} from "https://deno.land/std@0.118.0/path/mod.ts";
import { makeDir, readFile } from "https://deno.land/x/drake@v1.5.0/mod.ts";
import { writeFile } from "../shared/drake.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));

interface Attribute {
  trait_type: string;
  value: string;
}

interface TraitValue {
  score: number;
}

interface TraitType {
  [key: string]: TraitValue;
}

interface RarityTable {
  [key: string]: TraitType;
}

const columns = [
  "id",
  "score",
  "raw_usd",
  "usd",
  "eth",
  "eth_actual",
  "is_listed",
  "is_purchased",
  "give_away_wallet",
];

/**
 * Create a template to create a price list from, based on rarity scoring of each attribute.
 */
export function createExecutionTemplate() {
  const buildDir = resolve(__dirname, "../", "../", "build");
  const metaDir = join(buildDir, "metadata");
  const outFilePath = join(buildDir, "execution-sheet-template.csv");

  const rarityTable: RarityTable = JSON.parse(
    readFile(`${metaDir}/rarity.json`),
  );

  let scores: number[] = [];

  makeDir("build");

  writeFile(
    outFilePath,
    `${columns.join(",")}\n`,
  );

  for (let id = 1; id <= 8888; id++) {
    const metadata = JSON.parse(
      readFile(`${metaDir}/${id.toString().padStart(4, "0")}.json`),
    );
    //const metadata = JSON.parse(readFile(`${metaDir}/${id.toString()}.json`))
    const score = calculateScoreFromAttributes(
      metadata.attributes,
      rarityTable,
    );
    writeFile(outFilePath, `${id},${score},,,\n`, {
      append: true,
    });
    scores.push(score);
  }

  outputStats(scores);
}

function calculateScoreFromAttributes(
  attributes: Attribute[],
  rarityTable: RarityTable,
): number {
  const rawScore = attributes.reduce(
    (totalScore: number, { trait_type: traitType, value }: Attribute) =>
      totalScore + rarityTable[traitType][value].score,
    0,
  );
  return Math.round((rawScore + Number.EPSILON) * 100) / 100;
}

function outputStats(scores: number[]): void {
  console.log(`Matching scores: ${scores.length - (new Set(scores)).size}`);
  console.log(`Min: ${Math.min.apply(Math, scores)}`);
  console.log(`Max: ${Math.max.apply(Math, scores)}`);
  console.log(`Median: ${median(scores)}`);
  console.log(`Total: ${sum(scores)}`);
}

import { outputFile } from "fs-extra";
import {
  formatDataIntoSubArrays,
  formatSubarraysAsUnicorns,
} from "./utils/format";
import { scrape } from "./utils/scrape";

(async () => {
  const data = await scrape();

  const subArrays = formatDataIntoSubArrays(data);
  const unicorns = formatSubarraysAsUnicorns(subArrays);

  await outputFile("output/unicorns.json", JSON.stringify(unicorns));

  process.exit(0);
})();

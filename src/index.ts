import { outputFile } from "fs-extra";
import Unicorn from "./interfaces/Unicorn";
import {
  formatDataIntoSubArrays,
  formatSubarraysAsUnicorns,
} from "./utils/format";
import { scrape } from "./utils/scrape";

// IIFE to handle execution
(async () => {
  // Fetch unicorn data via web scraping
  const data = await scrape();

  // Massage scraped data into a nested array with each subarray representing a singular company
  const subArrays: string[][] = formatDataIntoSubArrays(data);

  // Transform the nested arrays into an array of unicorn objects representing a singular company
  const unicorns: Unicorn[] = formatSubarraysAsUnicorns(subArrays);

  // Write unicorn array as json to output dir
  await outputFile("output/unicorns.json", JSON.stringify(unicorns));

  // Exit
  process.exit(0);
})();

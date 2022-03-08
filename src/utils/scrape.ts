import puppeteer from "puppeteer";

/**
 * Instanties a new puppeteer instance and scrapes all of the table cells that exist within the cbinsights table body
 * @returns String[] - Array of all scraped calues from table cells
 */
export const scrape = async (): Promise<string[]> => {
  // Instantiate our browser & page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to cbinsights unicorn companies list
  await page.goto("https://www.cbinsights.com/research-unicorn-companies");

  // Evalulate all td elements and map over their inner html
  const data = await page.$$eval<string[]>("table tbody tr td", (tds) =>
    tds.map((td) => {
      return td.innerHTML;
    })
  );

  // Return string array of td innerhtml
  return data;
};

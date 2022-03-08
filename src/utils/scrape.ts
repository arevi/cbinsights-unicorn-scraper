import puppeteer from "puppeteer";

export const scrape = async (): Promise<string[]> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.cbinsights.com/research-unicorn-companies");

  const data = await page.$$eval<string[]>("table tbody tr td", (tds) =>
    tds.map((td) => {
      return td.innerHTML;
    })
  );

  return data;
};

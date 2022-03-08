# cbinsights-unicorn-scraper
Scrape results from a curated list of unicorn startups for educational purposes and output as JSON.

#### Why
> It's easy to get lost in the sea of early stage startups and you may be looking to have a proper list of unicorn (read: $1b+ valuation) startups. This will provide a digestable JSON document of those startups, which can then be transformed to suit your needs.

#### How
> Puppeteer is used to navigate to the cbinsights website, the information is scraped from their tabular format, and massaged. It is then written to disk as a json file.

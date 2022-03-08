import Unicorn from "../interfaces/Unicorn";

/**
 * Parse company name and the cbinsights url for that company from a hyperlink, returning a tuple of respective values
 * @param innerHtmlContent String - Innerhtml returned from parsing the TD, contains the company name within a hyperlink containing the url
 * @returns [string,string] - Tuple containing company name and cbinsights url, respectively
 */
const parseCompanyNameUrl = (innerHtmlContent: string): [string, string] => {
  // Regex strings to be used
  const nameRegex = new RegExp(/>([^<]*)</);
  const urlRegex = new RegExp(/href="(.*?)"/);

  // Perform search for name
  const nameSearchResult = innerHtmlContent.match(nameRegex);

  // If name search result returns nothing or less than 2 nodes, return empty strings
  if (!nameSearchResult || nameSearchResult.length < 2) {
    return ["", ""];
  }

  // Perform search for url
  const urlSearchResult = innerHtmlContent.match(urlRegex);

  // If url search result returns nothing or less than 2 nodes, return empty strings
  if (!urlSearchResult || urlSearchResult.length < 2) {
    return ["", ""];
  }

  // Return name and cbinsights url as a tuple
  return [nameSearchResult[1], urlSearchResult[1]];
};

/**
 * Iterates through all string values and groups n number of td cells to a respective company, returning a nested array with company details within each individual array
 * @param data String[] - array of all td cells
 * @returns String[][] - Subarrays with company values grouped to respective company
 */
export const formatDataIntoSubArrays = (data: string[]) => {
  // CBInsights represents each company as having 7 columns with unique data points, we can use this to form our bounds
  const fields = 7;

  // Reduces the string array into nested subarrays with each subarray containing details about the individual company
  const subArrays: string[][] = data.reduce(
    (resultsArr: string[][], item: string, index: number) => {
      // Identify the current index we should be appending to
      const chunkIndex = Math.floor(index / fields);

      // If no index, create the index
      if (!resultsArr[chunkIndex]) {
        resultsArr[chunkIndex] = [];
      }

      // Push the string to the respective company index without our string[][]
      resultsArr[chunkIndex].push(item);

      return resultsArr;
    },
    []
  );

  return subArrays;
};

/**
 * Processes and returns a string[][] as unicorn objects
 * @param data string[][] - Nested array of company details represented as strings
 * @returns Unicorn[] - Array of objects containing company information for each unicorn
 */
export const formatSubarraysAsUnicorns = (data: string[][]) => {
  // Instantiate the unicorns array
  const unicorns: Unicorn[] = [];

  // Loop over each company
  data.forEach((dataPoint) => {
    // Utilize utility function to parse company name and cbinsights url, returning tuple
    const companyIndentifiers = parseCompanyNameUrl(dataPoint[0]);

    // Build out the unicorn object
    // Various data massaging is done to make end result more readable
    let unicorn: Unicorn = {
      company: companyIndentifiers[0],
      cbUrl: companyIndentifiers[1],
      valuation: parseFloat(dataPoint[1].replace("$", "")),
      unicornDate: new Date(dataPoint[2]),
      country: dataPoint[3],
      city: dataPoint[4],
      industries: dataPoint[5]
        .replace("&amp;", "")
        .split(",")
        .map((industry) => industry.trim().replace(/ +(?= )/g, "")),
      investors: dataPoint[6].split(",").map((investor) => investor.trim()),
    };

    // Push newly created unicorn object to unicorns array
    unicorns.push(unicorn);
  });

  // Return unicorns array
  return unicorns;
};

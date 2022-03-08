import Unicorn from "../interfaces/Unicorn";

const parseCompanyNameUrl = (innerHtmlContent: string): [string, string] => {
  const nameRegex = new RegExp(/>([^<]*)</);
  const urlRegex = new RegExp(/href="(.*?)"/);

  const nameSearchResult = innerHtmlContent.match(nameRegex);

  if (!nameSearchResult || nameSearchResult.length < 2) {
    return ["", ""];
  }

  const urlSearchResult = innerHtmlContent.match(urlRegex);

  if (!urlSearchResult || urlSearchResult.length < 2) {
    return ["", ""];
  }

  return [nameSearchResult[1], urlSearchResult[1]];
};

export const formatDataIntoSubArrays = (data: string[]) => {
  const fields = 7;

  const subArrays: string[][] = data.reduce(
    (resultsArr: string[][], item: string, index: number) => {
      const chunkIndex = Math.floor(index / fields);

      if (!resultsArr[chunkIndex]) {
        resultsArr[chunkIndex] = [];
      }

      resultsArr[chunkIndex].push(item);

      return resultsArr;
    },
    []
  );

  return subArrays;
};

export const formatSubarraysAsUnicorns = (data: string[][]) => {
  const unicorns: Unicorn[] = [];

  data.forEach((dataPoint) => {
    const companyIndentifiers = parseCompanyNameUrl(dataPoint[0]);

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

    unicorns.push(unicorn);
  });

  return unicorns;
};

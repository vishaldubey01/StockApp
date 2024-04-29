import "dotenv/config";

const ALBERT_API_KEY: string = process.env.ALBERT_API_KEY ?? "";
const ALBERT_API_URL: string = "https://app.albert.com/casestudy/stock";

/**
 * Fetches tickers from API
 */
export const fetchTickers = async () => {
  const url = `${ALBERT_API_URL}/tickers`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Albert-Case-Study-API-Key": ALBERT_API_KEY,
    },
    method: "GET",
  });

  if (!response.ok) {
    // Handle HTTP errors, possibly by throwing an error with more information
    throw new Error(`API request failed with status ${response.status}: ${await response.text()}`);
  }

  try {
    let jsonRes = await response.json();
    return {
      status: response.status,
      body: jsonRes,
    };
  } catch (error) {
    // Handle JSON parsing errors or empty responses
    console.error("Error parsing JSON response:", error);
    throw new Error("Failed to parse JSON response");
  }
};

/**
 * Fetches tickers from API
 */
export const fetchPrices = async (tickers: string[]) => {
  if (tickers.length == 0) {
    throw new Error("Could not fetch prices, no tickers passed in");
  }

  let url = `${ALBERT_API_URL}/prices?tickers=`;

  for (let i = 0; i < tickers.length; i++) {
    url += `${tickers[i]}`;
    if (i < tickers.length - 1) {
      url += ",";
    }
  }

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Albert-Case-Study-API-Key": ALBERT_API_KEY,
    },
    method: "GET",
  });

  if (!response.ok) {
    // Handle HTTP errors, possibly by throwing an error with more information
    throw new Error(`API request failed with status ${response.status}: ${await response.text()}`);
  }

  try {
    let jsonRes = await response.json();
    // console.log(JSON.stringify(jsonRes, null, 2));
    return {
      status: response.status,
      body: jsonRes,
    };
  } catch (error) {
    // Handle JSON parsing errors or empty responses
    console.error("Error parsing JSON response:", error);
    throw new Error("Failed to parse JSON response");
  }
};

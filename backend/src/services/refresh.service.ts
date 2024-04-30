import prisma from "../config/prisma";
import { fetchPrices, fetchTickers } from "./stocks.service";

export async function refreshStockData() {
  try {
    // console.log("Fetching tickers and prices from API");

    const tickerRes = await fetchTickers();
    const tickers = Object.keys(tickerRes.body);
    const names = Object.values(tickerRes.body);

    const tickerPricesRes = await fetchPrices(tickers);
    const prices = Object.values(tickerPricesRes.body);

    const stocksData = tickers
      .map((ticker, index) => ({
        ticker,
        name: names[index] as string,
        price: prices[index] as number,
      }))
      .filter(stock => stock.ticker != null && stock.name != null && stock.price != null);

    // console.log("Stocks Data", stocksData);
    // console.log("Upserting to DB");

    stocksData.map(async stock => {
      await prisma.stocks.upsert({
        where: {
          ticker: stock.ticker,
        },
        update: {
          price: stock.price,
        },
        create: {
          ticker: stock.ticker,
          name: stock.name,
          price: stock.price,
        },
      });
    });

    console.log("Finished upserting stock tickers and prices to DB");

    return;
  } catch (err) {
    console.error("Failed to refresh stock data");
    console.error(err);
  }
}

async function fetchStocksFromDB() {
  const stocks = await prisma.stocks.findMany();
  console.log(stocks);
  return true;
}

// fetchStocksFromDB();

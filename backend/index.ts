import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./src/trpc/router";
import { createContext } from "./src/trpc/trpc";
import { RefreshStocksCronJob } from "./src/cron/cron";
var cors = require("cors");

// init express server
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); // for parsing application/json
app.use(morgan("dev")); // for pretty logging
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// ROUTES
app.get("/", (req, res) => {
  res.send("hello, world!");
});

RefreshStocksCronJob.start();

// initialize trpc on express server
const TRPC_ENDPOINT = "/trpc";
app.use(
  TRPC_ENDPOINT,
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// start the express server
app.listen(port, () => {
  console.log(`[server]: Server is running at PORT ${port} at ${`http://localhost:${port}`}`);
});

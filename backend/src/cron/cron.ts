import { CronJob } from "cron";
import { refreshStockData } from "../services/refresh.service";

const handleCronJob = async () => {
  console.log("Refreshing stock data");
  await refreshStockData();
};

export const RefreshStocksCronJob = new CronJob(
  "*/5 * * * * *",
  () => {
    handleCronJob();
  },
  null,
  true,
  "UTC"
);

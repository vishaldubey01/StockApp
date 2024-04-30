import { useEffect, useState } from "react";
import Watchlist from "./Watchlist";
import StockSearch from "./StockSearch";
import Header from "./components/Header";
import { trpcQuery } from "../config/api";

function Dashboard() {
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem("activeTab") || "watchlist";
    });

    const { data: stockData, isLoading: isLoadingStocks } =
        trpcQuery.user.getStocks.useQuery(undefined, {
            refetchInterval: 5000,
        });

    const { data: watchlistData, isLoading: isLoadingWatchlist } =
        trpcQuery.user.getWatchlist.useQuery(undefined, {
            refetchInterval: 5000,
        });

    useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
    }, [activeTab]);

    return (
        <div className='flex flex-col h-full min-h-screen w-full m-0 p-0'>
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className='flex flex-grow container mx-auto p-4'>
                {activeTab === "watchlist" ? (
                    <Watchlist
                        watchlistData={watchlistData ?? []}
                        isLoadingWatchlist={isLoadingWatchlist}
                    />
                ) : (
                    <StockSearch
                        watchlistData={watchlistData ?? []}
                        stockData={stockData ?? []}
                        isLoadingStocks={isLoadingStocks}
                    />
                )}
            </div>
        </div>
    );
}

export default Dashboard;

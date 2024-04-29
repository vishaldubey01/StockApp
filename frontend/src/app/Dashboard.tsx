import { useState } from "react";
import { trpcQuery } from "../config/api";
import Watchlist from "./components/Watchlist";
import { useAuth } from "../store/AuthContext";
import StockSearch from "./components/StockSearch";

function Dashboard() {
    const [activeTab, setActiveTab] = useState("watchlist");

    const { SignOut } = useAuth();

    return (
        <div className='flex flex-col h-full min-h-screen w-full m-0 p-0'>
            <header className=' w-full flex justify-between items-center p-4 text-white'>
                <div className='flex space-x-2'>
                    <button
                        className={`px-4 py-2 ${
                            activeTab === "watchlist"
                                ? "bg-blue-500"
                                : "bg-white text-black"
                        }`}
                        onClick={() => setActiveTab("watchlist")}
                    >
                        Watchlist
                    </button>
                    <button
                        className={`px-4 py-2 ${
                            activeTab === "allStocks"
                                ? "bg-blue-500"
                                : "bg-white text-black"
                        }`}
                        onClick={() => setActiveTab("allStocks")}
                    >
                        All Stocks
                    </button>
                </div>

                <button
                    className=''
                    onClick={() => {
                        SignOut();
                    }}
                >
                    Sign out
                </button>
            </header>
            <div className='flex flex-grow container mx-auto p-4'>
                {activeTab === "watchlist" ? <Watchlist /> : <StockSearch />}
            </div>
        </div>
    );
}

export default Dashboard;

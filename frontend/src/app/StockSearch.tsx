import { useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import StockRow from "./components/StockRow";
import StockHeader from "./components/StockHeader";
import Input from "@mui/joy/Input";
import { Stock } from "../interfaces";

interface StockSearchProps {
    watchlistData: Stock[];
    stockData: Stock[];
    isLoadingStocks: boolean;
}

const StockSearch: React.FC<StockSearchProps> = ({
    watchlistData,
    stockData,
    isLoadingStocks,
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    if (isLoadingStocks) {
        return (
            <div className='flex w-full justify-center'>
                <CircularProgress />
            </div>
        );
    }

    const filteredStockData = stockData?.filter(
        (stock) =>
            stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stock.ticker.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container mx-auto p-4'>
            <h2 className='text-2xl font-semibold mb-4'>All Stocks</h2>
            <div className='flex justify-center'>
                <div className='w-full max-w-md py-4'>
                    <Input
                        type='text'
                        variant='soft'
                        placeholder='Search stocks by name or ticker'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className='overflow-x-auto flex justify-center'>
                <table className='w-8/12'>
                    <StockHeader />
                    <tbody>
                        {filteredStockData?.map((stock) => (
                            <StockRow
                                stock={stock}
                                isInWatchlist={
                                    watchlistData?.some(
                                        (watchlistItem) =>
                                            watchlistItem.ticker ===
                                            stock.ticker
                                    ) || false
                                }
                                key={stock.ticker + "StockSearch"}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockSearch;

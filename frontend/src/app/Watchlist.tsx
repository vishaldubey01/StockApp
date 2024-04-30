import CircularProgress from "@mui/joy/CircularProgress";
import { useAuth } from "../store/AuthContext";
import StockHeader from "./components/StockHeader";
import StockRow from "./components/StockRow";
import { Stock } from "../interfaces";

interface WatchlistProps {
    watchlistData: Stock[];
    isLoadingWatchlist: boolean;
}

const Watchlist: React.FC<WatchlistProps> = ({
    watchlistData,
    isLoadingWatchlist,
}) => {
    const { user } = useAuth();

    if (isLoadingWatchlist) {
        return (
            <div className='flex w-full justify-center'>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className='container mx-auto p-4'>
            <h2 className='text-2xl font-semibold mb-4'>
                {user?.firstName ? `${user.firstName}'s` : "Your"} Watchlist
            </h2>
            {!watchlistData || watchlistData.length === 0 ? (
                <div className='pt-8 text-gray-600'>
                    Your watchlist is currently empty. Add stocks to view them
                    here!
                </div>
            ) : (
                <div className='overflow-x-auto flex justify-center'>
                    <table className='w-8/12'>
                        <StockHeader />
                        <tbody>
                            {watchlistData?.map((stock) => (
                                <StockRow
                                    stock={stock}
                                    isInWatchlist={true}
                                    key={stock.ticker + "Watchlist"}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Watchlist;

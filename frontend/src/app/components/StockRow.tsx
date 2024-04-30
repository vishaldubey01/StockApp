import React, { Key, useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import CircularProgress from "@mui/joy/CircularProgress";
import { trpcQuery } from "../../config/api";
import toast from "react-hot-toast";
import { Stock } from "../../interfaces";

interface StockRowProps {
    stock: Stock;
    isInWatchlist: boolean;
}

const StockRow: React.FC<StockRowProps> = ({ stock, isInWatchlist }) => {
    const [addingTicker, setAddingTicker] = useState<string | null>(null);
    const [removingTicker, setRemovingTicker] = useState<string | null>(null);

    const utils = trpcQuery.useUtils();

    const { mutateAsync: addToWatchlist } =
        trpcQuery.user.addStockToWatchlist.useMutation();

    const { mutateAsync: removeFromWatchlist } =
        trpcQuery.user.removeStockFromWatchlist.useMutation();

    async function handleAddToWatchlist(stock: Stock) {
        setAddingTicker(stock.ticker);
        try {
            await addToWatchlist({
                ticker: stock.ticker,
            });
            await utils.user.getWatchlist.invalidate();
            toast(`Added ${stock.name} (${stock.ticker}) to your watchlist!`);
        } catch (err) {
            console.error(err);
            toast(
                "Sorry, the selected stock couldn't be added to your watchlist. Please try again later."
            );
        } finally {
            setAddingTicker(null);
        }
    }

    async function handleRemoveFromWatchlist(stock: Stock) {
        setRemovingTicker(stock.ticker);
        try {
            await removeFromWatchlist({
                ticker: stock.ticker,
            });
            await utils.user.getWatchlist.invalidate();
            toast(
                `Removed ${stock.name} (${stock.ticker}) from your watchlist`
            );
        } catch (err) {
            console.error(err);
            toast(
                "Sorry, the selected stock couldn't be removed from your watchlist. Please try again later."
            );
        } finally {
            setRemovingTicker(null);
        }
    }

    return (
        <tr className='h-14 border-gray-300 border-b'>
            <td className='text-left pl-8 pr-6'>{stock.ticker}</td>
            <td className='text-left pl-8 pr-6'>{stock.name}</td>
            <td className='text-left pl-6 pr-6'>${stock.price.toFixed(2)}</td>
            <td className='text-center align-middle'>
                {isInWatchlist ? (
                    <button
                        className='bg-transparent focus:outline-none'
                        onClick={() => handleRemoveFromWatchlist(stock)}
                        disabled={removingTicker === stock.ticker}
                    >
                        {removingTicker === stock.ticker ? (
                            <CircularProgress
                                size='sm'
                                variant='plain'
                                color='danger'
                            />
                        ) : (
                            <IoRemoveCircleOutline size={25} color='red' />
                        )}
                    </button>
                ) : (
                    <button
                        className='bg-transparent focus:outline-none'
                        onClick={() => handleAddToWatchlist(stock)}
                        disabled={addingTicker === stock.ticker}
                    >
                        {addingTicker === stock.ticker ? (
                            <CircularProgress
                                size='sm'
                                variant='plain'
                                color='success'
                            />
                        ) : (
                            <IoAddCircleOutline size={25} color='green' />
                        )}
                    </button>
                )}
            </td>
        </tr>
    );
};

export default StockRow;

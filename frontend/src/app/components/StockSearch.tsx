import { useState } from "react";
import { trpcQuery } from "../../config/api";

function StockSearch() {
    const {
        data: stockData,
        refetch: refetchStocks,
        isRefetching: isRefetchingStocks,
        isLoading: isLoadingStocks,
    } = trpcQuery.user.getStocks.useQuery();

    const {
        data: watchlistData,
        refetch: refetchWatchlist,
        isRefetching: isRefetchingWatchlist,
        isLoading: isLoadingWatchlist,
    } = trpcQuery.user.getWatchlist.useQuery();

    const { mutateAsync: addToWatchlist, isLoading: isAddingToWatchlist } =
        trpcQuery.user.addStockToWatchlist.useMutation();

    if (isLoadingStocks) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container mx-auto p-4'>
            <h2 className='text-2xl font-semibold mb-4'>All Stocks</h2>
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white'>
                    <thead>
                        <tr className='w-full h-16 border-gray-300 border-b py-8'>
                            <th className='text-left pl-8 pr-6 text-gray-600 font-normal'>
                                Ticker
                            </th>
                            <th className='text-left pl-8 pr-6 text-gray-600 font-normal'>
                                Name
                            </th>
                            <th className='text-left pl-6 pr-6 text-gray-600 font-normal'>
                                Price
                            </th>
                            <th className='text-left pl-6 pr-6 text-gray-600 font-normal'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockData?.map((stock, index) => (
                            <tr
                                key={index}
                                className='h-14 border-gray-300 border-b'
                            >
                                <td className='text-left pl-8 pr-6 text-black'>
                                    {stock.ticker}
                                </td>
                                <td className='text-left pl-8 pr-6 text-black'>
                                    {stock.name}
                                </td>
                                <td className='text-left pl-6 pr-6 text-black'>
                                    ${stock.price.toFixed(2)}
                                </td>
                                <button className='bg-transparent text-black justify-center'>
                                    add
                                </button>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StockSearch;

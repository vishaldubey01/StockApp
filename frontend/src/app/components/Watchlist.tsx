import { useState } from "react";
import { trpcQuery } from "../../config/api";

function Watchlist() {
    const {
        data: watchlistData,
        refetch: refetchWatchlist,
        isRefetching: isRefetchingWatchlist,
        isLoading: isLoadingWatchlist,
    } = trpcQuery.user.getWatchlist.useQuery();

    console.log(watchlistData);

    if (isLoadingWatchlist) {
        return <div>Loading...</div>;
    }

    if (!watchlistData || watchlistData.length === 0) {
        return <div>Your watchlist is empty.</div>;
    }

    return (
        <div className='container mx-auto p-4'>
            <h2 className='text-2xl font-semibold mb-4'>Your Watchlist</h2>
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
                        </tr>
                    </thead>
                    <tbody>
                        {watchlistData.map((stock, index) => (
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Watchlist;

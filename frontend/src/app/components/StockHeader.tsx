import React from "react";

const StockHeader: React.FC = () => {
    return (
        <thead>
            <tr className='w-full h-16 border-gray-300 border-b py-8 '>
                <th className='text-left pl-8 pr-6 text-gray-600 dark:text-gray-400 font-normal'>
                    Ticker
                </th>
                <th className='text-left pl-8 pr-6 text-gray-600 dark:text-gray-400 font-normal'>
                    Name
                </th>
                <th className='text-left pl-6 pr-6 text-gray-600 dark:text-gray-400 font-normal'>
                    Price
                </th>
                <th className='text-left pl-6 pr-6 text-gray-600 font-normal'></th>
            </tr>
        </thead>
    );
};

export default StockHeader;

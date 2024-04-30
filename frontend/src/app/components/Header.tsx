import React from "react";
import { useAuth } from "../../store/AuthContext";
import Button from "@mui/joy/Button";

interface HeaderProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
    const { user, SignOut } = useAuth();

    return (
        <header className='w-full flex justify-between items-center p-4 text-white bg-white dark:bg-dark sticky top-0 z-50'>
            <div className='flex space-x-2'>
                <Button
                    variant={activeTab === "watchlist" ? "solid" : "outlined"}
                    onClick={() => setActiveTab("watchlist")}
                >
                    Watchlist
                </Button>
                <Button
                    variant={activeTab === "allStocks" ? "solid" : "outlined"}
                    onClick={() => setActiveTab("allStocks")}
                >
                    All Stocks
                </Button>
            </div>

            <div className='flex flex-row items-center gap-5'>
                <h5 className='text-black dark:text-white'>{user?.email}</h5>
                <Button
                    color='neutral'
                    variant='soft'
                    onClick={() => {
                        SignOut();
                    }}
                >
                    Sign out
                </Button>
            </div>
        </header>
    );
};

export default Header;

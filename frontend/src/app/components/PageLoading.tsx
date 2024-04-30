import React from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";

const PageLoading: React.FC = () => {
    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            minHeight='100vh'
        >
            <CircularProgress />
        </Box>
    );
};

export default PageLoading;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { queryClient, trpcQuery, trpcQueryClient } from "./config/api.js";
import { QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./store/AuthContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <trpcQuery.Provider
                client={trpcQueryClient}
                queryClient={queryClient}
            >
                <QueryClientProvider client={queryClient}>
                    <App />
                    <Toaster />
                </QueryClientProvider>
            </trpcQuery.Provider>
        </AuthProvider>
    </React.StrictMode>
);

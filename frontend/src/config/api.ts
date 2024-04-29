import { QueryClient } from "@tanstack/react-query";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

// import { firebaseAuth } from "./firebase";
import type { AppRouter } from "../../../backend/src/trpc/router";
import { firebaseAuth } from "../firebase/FirebaseConfig";

//     👆 **type-only** import

// Figure out the base URL of the API
// Get the URL of the development server
const BASE_URL = "http://localhost:3000";
const TRPC_BASE_URL = `${BASE_URL}/trpc`;

const getHeaders = async () => {
    if (firebaseAuth.currentUser) {
        const token = await firebaseAuth.currentUser.getIdToken();
        return {
            authorization: `Bearer ${token}`,
        };
    }
    return {};
};
const trpcQuery = createTRPCReact<AppRouter>();
const trpcQueryClient = trpcQuery.createClient({
    links: [
        httpBatchLink({
            url: TRPC_BASE_URL,
            async headers() {
                return await getHeaders();
            },
            // fetch(url, options) {
            //     return fetch(url, {
            //         ...options,
            //         credentials: "include",
            //     });
            // },
        }),
    ],
});
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpcDirect = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: `${BASE_URL}/trpc`,
            async headers() {
                return await getHeaders();
            },
            fetch(url, options) {
                return fetch(url, {
                    ...options,
                    credentials: "include",
                });
            },
        }),
    ],
});

const queryClient = new QueryClient();

// infer types from tRPC for specific use-cases when the type is required before the trpc function is called
type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;
export type User = Omit<
    RouterOutput["user"]["getCurrentUser"],
    "createdAt" | "updatedAt"
>;

export { trpcQuery, trpcQueryClient, queryClient, BASE_URL, trpcDirect };
export type { RouterInput, RouterOutput };

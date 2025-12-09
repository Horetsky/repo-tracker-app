"use client";

import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 30,

            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,

            retry: 1,
        },
    },
});

export const QueryProvider = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            { children }
        </QueryClientProvider>
    );
};
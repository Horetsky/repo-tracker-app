import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type Mutation<TInput, TOutput> = UseMutationOptions<TOutput, AxiosError, TInput>;
export type Query<TInput, TOutput> = UseQueryOptions<TInput, AxiosError, TOutput>;
import { UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type Mutation<TInput, TOutput> = UseMutationOptions<TOutput, AxiosError, TInput>;
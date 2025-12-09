import { isAxiosError } from "axios";

export function getErrorMessage(error: unknown): string {
    if (isAxiosError(error)) {
        const serverMessage = error.response?.data?.message;

        if (Array.isArray(serverMessage)) {
            return serverMessage[0];
        }

        if (typeof serverMessage === "string") {
            return serverMessage;
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Something went wrong";
}
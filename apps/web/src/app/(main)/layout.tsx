import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className={"h-screen flex flex-col items-center pt-24"}>
            { children }
        </div>
    );
}
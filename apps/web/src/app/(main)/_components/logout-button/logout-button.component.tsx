"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLogout } from "@/features/auth/hooks";
import { Spinner } from "@/components/ui/spinner";

export const LogoutButton = () => {
    const { isLoading, handleLogout } = useLogout();

    return (
        <Button
            size={"lg"}
            variant={"destructive"}
            onClick={handleLogout}
        >
            {
                isLoading ? <Spinner /> : <LogOut />
            }
            Log Out
        </Button>
    );
};

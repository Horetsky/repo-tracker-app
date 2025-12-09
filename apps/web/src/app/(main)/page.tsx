import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectsTable } from "@/app/(main)/_components";

export default function Page() {
    return (
        <div className={"flex flex-col min-w-1/2"}>
            <div className={"flex items-center justify-between mb-8"}>
                <h1 className={"text-5xl font-bold mb-2"}>
                    Projects 🧭
                </h1>
                <Button
                    size={"lg"}
                >
                    <Plus /> Add New
                </Button>
            </div>
            <div className={"flex-1"}>
                <ProjectsTable />
            </div>
        </div>
    );
}
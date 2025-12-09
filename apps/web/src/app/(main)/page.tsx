import { AddProjectForm, LogoutButton, ProjectsTable } from "@/app/(main)/_components";

export default function Page() {
    return (
        <div className={"flex flex-col min-w-3/4"}>
            <div className={"flex items-center justify-between mb-8"}>
                <h1 className={"text-5xl font-bold mb-2"}>
                    Projects 🧭
                </h1>
                <div className={"flex gap-4"}>
                    <AddProjectForm />
                    <LogoutButton />
                </div>
            </div>
            <div className={"flex-1"}>
                <ProjectsTable />
            </div>
        </div>
    );
}
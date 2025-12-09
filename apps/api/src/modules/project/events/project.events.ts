import { ProjectSyncStatus } from "@/modules/project/entities";

export namespace ProjectEvents {
    export namespace Update {
        export const name = "project.update";
        export type Payload = {
            projectId: string;
            status: ProjectSyncStatus
        };
    }
}
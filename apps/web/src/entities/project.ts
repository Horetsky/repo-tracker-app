import { UsersEntity } from "@/entities/user";

export type ProjectsEntity = {
    id: string;
    name: string;
    url: string;
    owner: string;
    ownerDetails?: {
        id: number;
        type: string;
        login: string;
        avatar_url: string;
        html_url: string;
    };
    stars: number;
    forks: number;
    issues: number;
    syncStatus: ProjectSyncStatus;
    userId: string;
    user: UsersEntity;
};

export enum ProjectSyncStatus {
    PENDING = "PENDING",
    SYNCED = "SYNCED",
    ERROR = "ERROR",
}
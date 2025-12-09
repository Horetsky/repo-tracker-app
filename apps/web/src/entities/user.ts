import { ProjectsEntity } from "@/entities/project";

export type UsersEntity = {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    projects?: ProjectsEntity[];
};
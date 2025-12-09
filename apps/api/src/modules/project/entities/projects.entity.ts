import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "@/modules/user/entities";

export enum ProjectSyncStatus {
    PENDING = "PENDING",
    SYNCED = "SYNCED",
    ERROR = "ERROR",
}

@Entity("projects")
export class ProjectsEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column()
    owner: string;

    @Column({ type: "jsonb", nullable: true })
    ownerDetails?: {
        id: number;
        type: string;
        login: string;
        avatar_url: string;
        html_url: string;
    };

    @Column({ default: 0 })
    stars: number;

    @Column({ default: 0 })
    forks: number;

    @Column({ default: 0 })
    issues: number;

    @Column({ type: "timestamp", nullable: true })
    githubCreatedAt: Date | null;

    @Column({
        type: "enum",
        enum: ProjectSyncStatus,
        default: ProjectSyncStatus.PENDING,
    })
    syncStatus: ProjectSyncStatus;

    @Column()
    userId: string;
    @JoinColumn({ name: "userId" })
    @ManyToOne(() => UsersEntity, user => user.projects, { onDelete: "CASCADE" })
    user?: UsersEntity;
}
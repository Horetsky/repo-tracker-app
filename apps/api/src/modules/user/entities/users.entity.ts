import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { ProjectsEntity } from "@/modules/project/entities";

@Entity("users")
export class UsersEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @OneToMany(() => ProjectsEntity, project => project.user)
    projects: ProjectsEntity[];
}
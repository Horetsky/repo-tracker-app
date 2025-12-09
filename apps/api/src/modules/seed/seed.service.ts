import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { UserService } from "@/modules/user/user.service";
import { ProjectService } from "@/modules/project/project.service";

import user from "./data/user.json";
import projects from "./data/projects.json";

@Injectable()
export class SeedService implements OnModuleInit {
    private readonly logger = new Logger(SeedService.name);

    constructor(
        private readonly userService: UserService,
        private readonly projectService: ProjectService,
    ) {}

    async onModuleInit() {
        const user = await this.seedUsers();
        await this.seedProjects(user.id);
    }

    async seedUsers() {
        const dbUser = await this.userService.findOneByEmail(user.email);

        if(dbUser) {
            this.logger.log("User already seeded. Skipping.");
            return dbUser;
        }

        this.logger.log("Seeding user...");
        return this.userService.create(user);
    }

    async seedProjects(userId: string) {
        const userProjects = await this.projectService.findAllByUserId(userId);
        if(userProjects.data.length > 0) {
            this.logger.log("Projects already seeded. Skipping.");
            return userProjects.data;
        }

        this.logger.log("Seeding projects...");
        const dbProjects = await this.projectService.createMany(
            userId,
            projects.map(path => {
                const [owner, name] = path.split("/");
                return { owner, name };
            }),
        );

        this.logger.log(`✅ Queued ${dbProjects.length} projects for sync`);

        return dbProjects;
    }
}

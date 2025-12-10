import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { GithubModule } from "@/infrastructure/github/github.module";
import { ConfigService } from "@/config.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectsEntity } from "@/modules/project/entities";
import { BullModule } from "@nestjs/bullmq";
import { projectsQueueConfig, ProjectsSyncQueueProcessor, ProjectsSyncQueueProducer } from "@/modules/project/queue";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProjectsEntity]),
        BullModule.registerQueue(...Object.values(projectsQueueConfig)),
        GithubModule.forFeature({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    apiKey: configService.optionalEnv("GITHUB_API_KEY"),
                };
            },
        }),
    ],
    controllers: [ProjectController],
    providers: [
        ProjectService,
        ProjectsSyncQueueProducer,
        ProjectsSyncQueueProcessor,
    ],
    exports: [ProjectService],
})
export class ProjectModule {}

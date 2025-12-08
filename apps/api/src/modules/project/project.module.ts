import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { GithubModule } from "@/infrastructure/github/github.module";
import { ConfigService } from "@/config.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectsEntity } from "@/modules/project/entities";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProjectsEntity]),
        GithubModule.forFeature({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    apiKey: configService.env("GITHUB_API_KEY"),
                };
            },
        }),
    ],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {}

import { Processor, WorkerHost } from "@nestjs/bullmq";
import { projectsQueueConfig } from "./projects-queue.config";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectsEntity, ProjectSyncStatus } from "@/modules/project/entities";
import { Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { ProjectSyncQueueDto } from "./dto";
import { GithubService } from "@/infrastructure/github/services";
import { githubRepoResponseToProjectsEntity } from "@/infrastructure/github/mappers";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ProjectEvents } from "@/modules/project/events";

@Processor(projectsQueueConfig.githubSync.name)
export class ProjectsSyncQueueProcessor extends WorkerHost {
    private readonly logger = new Logger(ProjectsSyncQueueProcessor.name);

    constructor(
        @InjectRepository(ProjectsEntity)
        private readonly projectsRepository: Repository<ProjectsEntity>,
        private readonly githubService: GithubService,
        private readonly eventEmitter: EventEmitter2,
    ) {
        super();
    }

    async process(job: Job<ProjectSyncQueueDto>) {
        const { projectId, owner, name } = job.data;
        try {
            const repo = await this.githubService.getRepo({ owner, name });

            if(!repo) throw new Error("Repo not found");

            await this.projectsRepository.update(
                projectId, {
                    ...githubRepoResponseToProjectsEntity(repo),
                    syncStatus: ProjectSyncStatus.SYNCED,
                },
            );

            this.eventEmitter.emit(
                ProjectEvents.Update.name, {
                    projectId,
                    status: ProjectSyncStatus.SYNCED,
                },
            );

            this.logger.log(`Synced project ${owner}/${name}`);
        } catch(e) {
            this.logger.error(`Failed to sync project ${owner}/${name}: ${e.message}`);
            await this.projectsRepository.update(
                projectId, {
                    syncStatus: ProjectSyncStatus.ERROR,
                },
            );
            this.eventEmitter.emit(
                ProjectEvents.Update.name, {
                    projectId,
                    status: ProjectSyncStatus.ERROR,
                },
            );
        }
    }
}
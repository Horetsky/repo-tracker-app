import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { projectsQueueConfig } from "./projects-queue.config";
import { ProjectsEntity } from "@/modules/project/entities";
import { ProjectSyncQueueDto } from "@/modules/project/queue/dto";
import { IQueueProducer } from "@/lib/bullmq/types";

@Injectable()
export class ProjectsSyncQueueProducer implements IQueueProducer {
    constructor(
        @InjectQueue(projectsQueueConfig.githubSync.name) private queue: Queue,
    ) {}

    push(project: ProjectsEntity) {
        return this.queue.add(
            projectsQueueConfig.githubSync.name,
            this.getPayload(project),
        );
    }

    pushBatch(payload: ProjectsEntity[]) {
        return this.queue.addBulk(
            payload.map(item => ({
                name: projectsQueueConfig.githubSync.name,
                data: this.getPayload(item),
            })),
        );
    }

    private getPayload(project: ProjectsEntity): ProjectSyncQueueDto {
        return {
            projectId: project.id,
            owner: project.owner,
            name: project.name,
        };
    }
}
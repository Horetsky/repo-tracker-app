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
        const payload: ProjectSyncQueueDto = {
            projectId: project.id,
            owner: project.owner,
            name: project.name,
        };
        return this.queue.add(projectsQueueConfig.githubSync.name, payload);
    }
}
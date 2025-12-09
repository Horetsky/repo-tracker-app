import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { AddProjectDto, GetProjectDto } from "@/modules/project/dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectsEntity, ProjectSyncStatus } from "@/modules/project/entities";
import { Repository } from "typeorm";
import { ResponseWithPaginationDto } from "@/dtos";
import { ProjectsSyncQueueProducer } from "@/modules/project/queue";
import { addProjectDtoToProjectsEntity } from "@/modules/project/mappers";

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectsEntity)
        private readonly projectsRepository: Repository<ProjectsEntity>,
        private readonly projectsSyncQueue: ProjectsSyncQueueProducer,
    ) {}

    async create(userId: string, input: AddProjectDto) {
        const { owner, name } = input;

        const exists = await this.projectsRepository.exists({
            where: { owner, name, userId },
        });

        if(exists) throw new ConflictException();

        const project = this.projectsRepository.create(addProjectDtoToProjectsEntity(input, userId));

        const dbProject = await this.projectsRepository.save(project);

        await this.projectsSyncQueue.push(dbProject);

        return dbProject;
    }

    async createMany(userId: string, input: AddProjectDto[]) {
        const projects = this.projectsRepository.create(
            input.map(project => addProjectDtoToProjectsEntity(project, userId)),
        );

        const dbProjects = await this.projectsRepository.save(projects);

        await this.projectsSyncQueue.pushBatch(dbProjects);

        return dbProjects;
    }

    async findById(id: string, userId: string): Promise<ProjectsEntity> {
        const dbProject = await this.projectsRepository.findOne({ where: { id, userId } });

        if(!dbProject) throw new NotFoundException();

        return dbProject;
    }

    async findAllByUserId(userId: string, params: GetProjectDto = {}): Promise<ResponseWithPaginationDto<ProjectsEntity[]>> {
        const {
            page = 1,
            limit = 10,
        } = params;

        const skip = (page - 1) * limit;

        const [projects, total] = await this.projectsRepository.findAndCount({
            where: { userId },
            skip,
            take: limit,
            order: {
                createdAt: "DESC",
            },
        });


        return new ResponseWithPaginationDto(projects, { page, limit, total });
    }

    async delete(id: string, userId: string) {
        await this.projectsRepository.delete({ id, userId });
        return true;
    }

    async refresh(id: string, userId: string) {
        const dbProject = await this.projectsRepository.findOne({
            where: { id, userId },
        });

        if(!dbProject) throw new NotFoundException();

        await this.projectsRepository.update(id, { syncStatus: ProjectSyncStatus.PENDING });
        await this.projectsSyncQueue.push(dbProject);

        return true;
    }
}
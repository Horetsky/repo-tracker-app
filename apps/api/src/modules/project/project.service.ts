import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { AddProjectDto, GetProjectDto } from "@/modules/project/dto";
import { GithubService } from "@/infrastructure/github/services";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectsEntity } from "@/modules/project/entities";
import { Repository } from "typeorm";
import { ResponseWithPaginationDto } from "@/dtos";
import { githubRepoResponseToProjectsEntity } from "@/infrastructure/github/mappers";

@Injectable()
export class ProjectService {
    constructor(
        private readonly githubService: GithubService,
        @InjectRepository(ProjectsEntity)
        private readonly projectsRepository: Repository<ProjectsEntity>,
    ) {}

    async create(userId: string, input: AddProjectDto) {
        const exists = await this.projectsRepository.exists({
            where: {
                owner: input.owner,
                name: input.repo,
            },
        });

        if(exists) throw new ConflictException();

        const repo = await this.githubService.getRepo({
            owner: input.owner,
            repo: input.repo,
        });

        if(!repo) throw new BadRequestException();

        const project = this.projectsRepository.create(
            githubRepoResponseToProjectsEntity(repo, userId),
        );

        return this.projectsRepository.save(project);
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

        const repo = await this.githubService.getRepo({
            owner: dbProject.owner,
            repo: dbProject.name,
        });

        if(!repo) throw new BadRequestException();

        await this.projectsRepository.update(
            id,
            githubRepoResponseToProjectsEntity(repo, userId),
        );
        return true;
    }
}
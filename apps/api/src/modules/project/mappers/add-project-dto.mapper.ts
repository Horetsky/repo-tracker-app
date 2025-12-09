import { ProjectsEntity } from "@/modules/project/entities";
import { DeepPartial } from "typeorm";
import { AddProjectDto } from "@/modules/project/dto";

export function addProjectDtoToProjectsEntity(dto: AddProjectDto, userId: string): DeepPartial<ProjectsEntity> {
    const { owner, name } = dto;
    return {
        userId,
        name,
        owner,
        url: `https://github.com/${owner}/${name}`,
    };
}
import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { AddProjectDto, GetProjectDto } from "@/modules/project/dto";
import { Session } from "@/decorators";
import { ServerSession } from "@/types";
import { ResponseWithPaginationDto } from "@/dtos";
import { ProjectsEntity } from "@/modules/project/entities";

@Controller("projects")
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService,
    ) {}

    @Post()
    addProject(
        @Body() body: AddProjectDto,
        @Session() session: ServerSession,
    ) {
        return this.projectService.create(session.user.id, body);
    }

    @Get("me")
    getProjects(
        @Query() params: GetProjectDto,
        @Session() session: ServerSession,
    ): Promise<ResponseWithPaginationDto<ProjectsEntity[]>> {
        return this.projectService.findAllByUserId(session.user.id, params);
    }

    @Get(":id")
    getProject(
        @Param("id") id: string,
        @Session() session: ServerSession,
    ) {
        return this.projectService.findById(id, session.user.id);
    }

    @Post(":id/refresh")
    updateProject(
        @Param("id") id: string,
        @Session() session: ServerSession,
    ) {
        return this.projectService.refresh(id, session.user.id);
    }

    @Delete(":id")
    deleteProject(
        @Param("id") id: string,
        @Session() session: ServerSession,
    ) {
        return this.projectService.delete(id, session.user.id);
    }
}
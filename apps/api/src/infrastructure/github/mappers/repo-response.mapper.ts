import { GithubRepoResponseDto } from "@/infrastructure/github/dto";
import { ProjectsEntity } from "@/modules/project/entities";

export function githubRepoResponseToProjectsEntity(response: GithubRepoResponseDto, userId: string): Omit<ProjectsEntity, "id"> {
    return {
        userId,
        name: response.name,
        url: response.html_url,
        stars: response.stargazers_count,
        forks: response.forks_count,
        issues: response.open_issues_count,
        owner: response.owner.login,
        ownerDetails: {
            id: response.owner.id,
            type: response.owner.type,
            login: response.owner.login,
            avatar_url: response.owner.avatar_url,
            html_url: response.owner.html_url,
        },
    };
}
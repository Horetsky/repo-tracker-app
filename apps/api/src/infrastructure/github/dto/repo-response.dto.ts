
export class GithubRepoResponseDto {
    id: number;
    name: string;
    html_url: string;
    owner: GithubRepoOwner;

    forks: number;
    forks_count: string;
    open_issues: number;
    open_issues_count: number;
    stargazers_count: number;

    created_at: Date;

    constructor(input: GithubRepoResponseDto) {
        Object.assign(this, input);
    }
}

export class GithubRepoOwner {
    id: number;
    type: string;
    login: string;
    avatar_url: string;
    html_url: string;
}
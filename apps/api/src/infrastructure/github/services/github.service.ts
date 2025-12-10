import { Inject, Injectable, Logger } from "@nestjs/common";
import { GITHUB_MODULE_CONFIG, GithubModuleConfig } from "@/infrastructure/github/github.config";
import { GetGithubRepoDto, GithubRepoResponseDto } from "@/infrastructure/github/dto";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class GithubService {
    private readonly logger = new Logger(GithubService.name);

    constructor(
        @Inject(GITHUB_MODULE_CONFIG)
        private readonly config: GithubModuleConfig,
        private readonly httpService: HttpService,
    ) {}

    async getRepo(input: GetGithubRepoDto): Promise<GithubRepoResponseDto | null> {
        try {
            const requestUrl = this.config.baseUrl + `/repos/${input.owner}/${input.name}`;

            const headers: Record<string, string> = {
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
            };

            if(this.config.apiKey) {
                headers["Authorization"] = `Bearer ${this.config.apiKey}`;
            }

            const response$ = this.httpService.get<GithubRepoResponseDto>(
                requestUrl,
                { headers },
            );

            const response = await firstValueFrom(response$);
            return response.data;
        } catch(e) {
            this.logger.error(`Failed to get repo from Github: ${e.message}`);
            return null;
        }
    }
}

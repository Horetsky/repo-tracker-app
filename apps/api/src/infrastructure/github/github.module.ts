import { DynamicModule, Module, Provider } from "@nestjs/common";
import {
    GITHUB_MODULE_CONFIG, GithubModuleConfig,
    GithubModuleConfigAsyncOptions,
} from "@/infrastructure/github/github.config";
import { GithubService } from "@/infrastructure/github/services";
import { HttpModule } from "@nestjs/axios";

@Module({})
export class GithubModule {
    static forFeature(options: GithubModuleConfigAsyncOptions): DynamicModule {
        const configProvider: Provider = {
            provide: GITHUB_MODULE_CONFIG,
            inject: options.inject,
            useFactory: async(...args) => { 
                const configOptions = await options.useFactory(...args);
                return new GithubModuleConfig(configOptions);
            },
        };

        const providers: Provider[] = [
            configProvider,
            GithubService,
        ];

        return {
            imports: [
                HttpModule,
                ...(options.imports || []),
            ],
            module: GithubModule,
            providers,
            exports: [GithubService],
        };
    }
}

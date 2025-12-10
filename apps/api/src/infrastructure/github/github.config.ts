import { InjectionToken, ModuleMetadata, OptionalFactoryDependency } from "@nestjs/common";

export const GITHUB_MODULE_CONFIG = "GOOGLE_PLACES_MODULE_CONFIG";

export type GithubModuleConfigOptions = {
    apiKey?: string;
    baseUrl?: string
};

export interface GithubModuleConfigAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    useFactory: (...args: any[]) => Promise<GithubModuleConfigOptions> | GithubModuleConfigOptions;
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
}


export class GithubModuleConfig {
    apiKey: string | undefined = undefined;
    baseUrl: string = "https://api.github.com";

    constructor(options: GithubModuleConfigOptions) {
        if(options.apiKey) this.apiKey = options.apiKey;
        if(options.baseUrl) this.baseUrl = options.baseUrl;
    }
}
import { Injectable } from "@nestjs/common";
import "dotenv/config";

const environmentVariables = [
    // Application
    "PORT",
    "MODE",
    "DOMAIN",

    // Database
    "DB_HOST",
    "DB_PORT",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME",

    // Redis
    "REDIS_HOST",
    "REDIS_PORT",

    // Authentification
    "JWT_SECRET",

    // Providers
    "GITHUB_API_KEY",
] as const;

@Injectable()
export class ConfigService {
    constructor() {
        this.ensureValues();
    }

    public env<T = string>(key: typeof environmentVariables[number]): T {
        return process.env[key] as T;
    }

    get isProduction() {
        const mode = this.env("MODE");
        return mode === "PROD";
    }

    private ensureValues() {
        environmentVariables.forEach(item => {
            const value = process.env[item];
            if(!value) throw new Error(`Config error: missing env.${item}`);
        });
    }
}
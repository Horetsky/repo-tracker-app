import { SharedBullAsyncConfiguration } from "@nestjs/bullmq/dist/interfaces";
import { ConfigService } from "@/config.service";

export default {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        return {
            connection: {
                host: configService.env("REDIS_HOST"),
                port: parseInt(configService.env("REDIS_PORT")),
            },
        };
    },
} satisfies SharedBullAsyncConfiguration;
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import dbConfig from "@/config/db.config";
import bullmqConfig from "@/config/bullmq.config";
import { ConfigModule } from "@/config.module";
import modules from "@/modules";
import { APP_GUARD } from "@nestjs/core";
import { AccessTokenGuard } from "@/modules/auth/guards";
import { BullModule } from "@nestjs/bullmq";

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync(dbConfig.masterConnection.provider),
        BullModule.forRootAsync(bullmqConfig),
        ...modules,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AccessTokenGuard,
        },
    ],
})
export class AppModule {}

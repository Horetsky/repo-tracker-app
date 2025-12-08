import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import dbConfig from "@/config/db.config";
import { ConfigModule } from "@/config.module";

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync(dbConfig.masterConnection.provider),
    ],
    controllers: [AppController],
})
export class AppModule {}

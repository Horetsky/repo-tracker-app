import { ConfigService } from "@/config.service";
import { Provider } from "@nestjs/common";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const MASTER_CONNECTION_NAME = "MASTER_CONNECTION";

const masterConnectionProvider: Provider = {
    provide: MASTER_CONNECTION_NAME,
    inject: [ConfigService],
    useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: "postgres",
        host: configService.env("DB_HOST"),
        port: parseInt(configService.env("DB_PORT")),
        username: configService.env("DB_USER"),
        password: configService.env("DB_PASSWORD"),
        database: configService.env("DB_NAME"),
        entities: [__dirname + "../../**/*.entity.{js,ts}"],
        synchronize: true,
        logging: false,
        ssl: configService.isProduction,
    }),
};

export default {
    masterConnection: {
        name: MASTER_CONNECTION_NAME,
        provider: masterConnectionProvider,
    },
};
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@/config.service";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import corsConfig from "@/config/cors.config";
import cookieParser from "cookie-parser";

async function bootstrap() {
    const config = new ConfigService();

    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix("/api");

    app.use(cookieParser());

    app.enableCors(corsConfig);

    app.useGlobalPipes(
        new ValidationPipe({
            stopAtFirstError: true,
            transform: true,
            whitelist: true,
        }),
    );

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    await app.listen(config.env("PORT"));
}
bootstrap();

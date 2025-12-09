import { Module } from "@nestjs/common";
import { AuthService, TokensService } from "./services";
import { AuthController } from "./auth.controller";
import { UserModule } from "@/modules/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@/config.service";

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.env("JWT_SECRET"),
                    signOptions: {
                        expiresIn: "1d",
                    },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        TokensService,
    ],
    exports: [
        TokensService,
    ],
})
export class AuthModule {}

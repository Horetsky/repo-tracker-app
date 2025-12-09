import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersEntity } from "@/modules/user/entities";
import { JwtTokenPayload, SessionResponseDto } from "@/modules/auth/dto";
import { CookieOptions, Request, Response } from "express";
import { ISessionUser, ServerSession } from "@/types";
import { ConfigService } from "@/config.service";

@Injectable()
export class TokensService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    private readonly cookieOptions: CookieOptions = {
        httpOnly: true,
        path: "/",
        secure: this.configService.isProduction,
        sameSite: "lax",
        domain: this.configService.env("DOMAIN"),
    };

    sign(user: UsersEntity): SessionResponseDto {
        const payload: JwtTokenPayload = {
            sub: user.id,
            email: user.email,
        };
        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken: accessToken,
            payload,
        };
    };

    extractFromHeaderAsBearer(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") || [];
        return type === "Bearer" ? token : undefined;
    }

    verify(token: string): Promise<JwtTokenPayload> {
        return this.jwtService.verifyAsync(token);
    }

    setSererSession(request: Request, token: string, payload: JwtTokenPayload) {
        request["user"] = {
            user: {
                token,
                id: payload.sub,
                email: payload.email,
            },
        } satisfies ServerSession<ISessionUser>;
    }

    setClientSession(response: Response, session: SessionResponseDto) {
        response.cookie(
            "access_token",
            session.accessToken,
            this.cookieOptions,
        );
    }
}
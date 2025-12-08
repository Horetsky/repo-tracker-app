import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersEntity } from "@/modules/user/entities";
import { JwtTokenPayload, SessionResponseDto } from "@/modules/auth/dto";
import { Request } from "express";
import { ISessionUser, ServerSession } from "@/types";

@Injectable()
export class TokensService {
    constructor(
        private readonly jwtService: JwtService,
    ) {}

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
}
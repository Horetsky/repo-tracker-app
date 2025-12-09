import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService, TokensService } from "./services";
import { LoginDto, RegisterDto, SessionResponseDto } from "@/modules/auth/dto";
import { Public } from "@/decorators";
import { Response } from "express";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly tokensService: TokensService,
    ) {}

    @Public()
    @Post("register")
    async register(
        @Body() body: RegisterDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<SessionResponseDto> {
        const session = await this.authService.register(body);
        this.tokensService.setClientSession(response, session);
        return session;
    }

    @Public()
    @Post("login")
    async login(
        @Body() body: LoginDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<SessionResponseDto> {
        const session = await this.authService.login(body);
        this.tokensService.setClientSession(response, session);
        return session;
    }
}

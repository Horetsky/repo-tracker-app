import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./services";
import { LoginDto, RegisterDto, SessionResponseDto } from "@/modules/auth/dto";
import { Public } from "@/decorators";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Public()
    @Post("register")
    async register(
        @Body() body: RegisterDto,
    ): Promise<SessionResponseDto> {
        return this.authService.register(body);
    }

    @Public()
    @Post("login")
    async login(
        @Body() body: LoginDto,
    ): Promise<SessionResponseDto> {
        return this.authService.login(body);
    }
}

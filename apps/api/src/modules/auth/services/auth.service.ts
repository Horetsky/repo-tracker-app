import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto, RegisterDto, SessionResponseDto } from "@/modules/auth/dto";
import { UserService } from "@/modules/user/user.service";
import bcrypt from "bcryptjs";
import { TokensService } from "@/modules/auth/services/tokens.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokensService: TokensService,
    ) {}

    async register(input: RegisterDto): Promise<SessionResponseDto> {
        const user = await this.userService.create(input);
        return this.tokensService.sign(user);
    }

    async login(input: LoginDto): Promise<SessionResponseDto> {
        const dbUser = await this.userService.findOneByEmail(input.email);

        if(!dbUser) throw new UnauthorizedException();

        const match = await bcrypt.compare(input.password, dbUser.password);

        if(!match) throw new UnauthorizedException();

        return this.tokensService.sign(dbUser);
    }
}

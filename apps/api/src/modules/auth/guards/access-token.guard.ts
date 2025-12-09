import { Reflector } from "@nestjs/core";
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Scope } from "@nestjs/common";
import { TokensService } from "../services";
import { PUBLIC_DECORATOR_KEY } from "@/decorators";

@Injectable({ scope: Scope.REQUEST })
export class AccessTokenGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly tokensService: TokensService,
    ) {}

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride(PUBLIC_DECORATOR_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if(isPublic) return true;

        const request = context.switchToHttp().getRequest();

        try {
            const token = this.tokensService.extractFromCookie(request);
            if(!token) throw new UnauthorizedException();

            const validToken = await this.tokensService.verify(token);
            this.tokensService.setSererSession(request, token, validToken);
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}
import { Controller, Get } from "@nestjs/common";
import { UserService } from "@/modules/user/user.service";
import { ISessionUser, ServerSession } from "@/types";
import { Session } from "@/decorators";

@Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get("me")
    async getUser(
        @Session() session: ServerSession<ISessionUser>,
    ) {
        return this.userService.findOneByEmail(session.user.email);
    }
}
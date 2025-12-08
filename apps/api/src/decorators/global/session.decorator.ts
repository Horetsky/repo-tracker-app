import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { EmptyServerSession } from "@/types";

export const Session = createParamDecorator((_key: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const user = request?.user;

    if(!user) {
        return { user: { id: undefined, token: undefined } } satisfies EmptyServerSession;
    }

    return user;
});
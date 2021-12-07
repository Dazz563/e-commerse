import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";


export const GetUser = createParamDecorator((_data, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest();
    // console.log(req.user);
    return req.user;
});
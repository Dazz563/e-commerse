import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const CurrentMerchant = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()
        return request.currentMerchant;
    }
)
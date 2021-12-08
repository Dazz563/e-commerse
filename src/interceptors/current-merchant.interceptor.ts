import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { MerchantsService } from "src/merchants/merchants.service";



@Injectable()
export class CurrentMerchantInterceptor implements NestInterceptor {

    constructor(
        private merchantsService: MerchantsService,
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session || {};

        if (userId) {
            const user = await this.merchantsService.findMerchantById(userId);
            request.currentUser = user;
        }

        return next.handle();
    }


}
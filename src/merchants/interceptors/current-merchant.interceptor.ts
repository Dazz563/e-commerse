import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { MerchantsService } from "../merchants.service";


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
            request.currentMerchant = user;
        }

        return next.handle();
    }


}
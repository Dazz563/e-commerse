import { Expose } from "class-transformer";


export class MerchantDto {

    @Expose()
    id: string;

    @Expose()
    merchant_name: string;

    @Expose()
    location: string;

    @Expose()
    contact_number: string;

    @Expose()
    email: string;

    @Expose()
    role: string;
}
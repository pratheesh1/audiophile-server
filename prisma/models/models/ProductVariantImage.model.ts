import { IsInt, IsDefined, IsString, IsDate } from "class-validator";
import { ProductVariant } from "./";

export class ProductVariantImage {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    url!: string;

    @IsDefined()
    Product!: ProductVariant;

    @IsDefined()
    @IsInt()
    productId!: number;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}

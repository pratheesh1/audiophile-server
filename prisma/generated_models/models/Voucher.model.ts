import { IsInt, IsDefined, IsString, IsOptional, IsDate } from "class-validator";
import { User, Product, ProductVariant } from "./";

export class Voucher {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    code!: string;

    @IsDefined()
    @IsString()
    type!: string;

    @IsDefined()
    value!: number;

    @IsDefined()
    User!: User;

    @IsDefined()
    Product!: Product;

    @IsDefined()
    @IsInt()
    productId!: number;

    @IsOptional()
    ProduvtVariant?: ProductVariant;

    @IsOptional()
    @IsInt()
    productVariantId?: number;

    @IsDefined()
    @IsInt()
    userId!: number;

    @IsOptional()
    percent?: number;

    @IsDefined()
    minAmount!: number;

    @IsDefined()
    maxAmount!: number;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}

import { IsInt, IsDefined, IsString, IsDate } from "class-validator";
import { Product, CartItems } from "./";

export class ProductVariant {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsString()
    description!: string;

    @IsDefined()
    price!: number;

    @IsDefined()
    @IsString()
    image!: string;

    @IsDefined()
    product!: Product;

    @IsDefined()
    @IsInt()
    productId!: number;

    @IsDefined()
    @IsString()
    sku!: string;

    @IsDefined()
    @IsInt()
    stock!: number;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsDefined()
    CartItems!: CartItems[];
}

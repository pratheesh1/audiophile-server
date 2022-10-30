import { IsInt, IsDefined, IsString, IsDate } from "class-validator";
import { Product } from "./";

export class ProductImage {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    url!: string;

    @IsDefined()
    Product!: Product;

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

import { IsInt, IsDefined, IsString, IsOptional, IsDate } from "class-validator";
import { Product } from "./";

export class ProductProperty {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

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

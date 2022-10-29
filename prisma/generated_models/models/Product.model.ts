import { IsInt, IsDefined, IsString, IsDate } from "class-validator";
import { Category, ProductVariant, ProductProperty, ProductImage } from "./";

export class Product {
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
    brand!: string;

    @IsDefined()
    @IsInt()
    quantity!: number;

    @IsDefined()
    Category!: Category;

    @IsDefined()
    @IsInt()
    categoryId!: number;

    @IsDefined()
    ProductVariant!: ProductVariant[];

    @IsDefined()
    ProductProperty!: ProductProperty[];

    @IsDefined()
    ProductImage!: ProductImage[];

    @IsDefined()
    @IsString()
    sku!: string;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}

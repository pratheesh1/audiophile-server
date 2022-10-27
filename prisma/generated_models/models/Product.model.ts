import { IsInt, IsDefined, IsString, IsDate } from "class-validator";
import { Category, ProductVariant, ProductProperty, CartItems } from "./";

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
    image!: string;

    @IsDefined()
    category!: Category;

    @IsDefined()
    @IsInt()
    categoryId!: number;

    @IsDefined()
    ProductVariant!: ProductVariant[];

    @IsDefined()
    ProductProperty!: ProductProperty[];

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

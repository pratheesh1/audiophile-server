import { IsInt, IsDefined, IsString, IsOptional, IsDate } from "class-validator";
import { Product, ProductVariantProperty, ProductVariantImage } from "./";

export class ProductVariant {
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
    price!: number;

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

    @IsDefined()
    ProductVariantProperty!: ProductVariantProperty[];

    @IsDefined()
    ProductVariantImage!: ProductVariantImage[];
}

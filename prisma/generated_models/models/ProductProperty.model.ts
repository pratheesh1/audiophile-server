import { IsInt, IsDefined, IsString, IsOptional, IsIn, IsDate } from "class-validator";
import { Product } from "./";
import { getEnumValues } from "../helpers";
import { ProductPropertyType } from "../enums";

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
    @IsIn(getEnumValues(ProductPropertyType))
    type!: ProductPropertyType;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}

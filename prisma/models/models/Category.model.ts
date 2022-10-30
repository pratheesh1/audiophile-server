import { IsInt, IsDefined, IsString, IsOptional, IsDate } from "class-validator";
import { Product } from "./";

export class Category {
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
    Product!: Product[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;
}

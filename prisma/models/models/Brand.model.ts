import { IsInt, IsDefined, IsString, IsOptional, IsDate } from "class-validator";
import { Product } from "./";

export class Brand {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    logoUri?: string;

    @IsDefined()
    Product!: Product[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}

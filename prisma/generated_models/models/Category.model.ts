import { IsInt, IsDefined, IsString, IsOptional, IsDate } from "class-validator";
import "./";

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
    @IsDate()
    createdAt!: Date;
}

import { IsInt, IsDefined, IsString, IsDate } from "class-validator";
import "./";

export class Brand {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsString()
    logoUri!: string;

    @IsDefined()
    @IsDate()
    createdAt!: Date;
}

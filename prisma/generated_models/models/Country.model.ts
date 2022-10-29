import { IsInt, IsDefined, IsString, IsDate } from "class-validator";
import "./";

export class Country {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsString()
    code!: string;

    @IsDefined()
    @IsDate()
    createdAt!: Date;
}

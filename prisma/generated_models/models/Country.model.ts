import { IsInt, IsDefined, IsString, IsDate } from "class-validator";
import { Address } from "./";

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

    @IsDefined()
    Address!: Address[];
}

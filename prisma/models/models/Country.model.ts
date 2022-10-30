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
    Address!: Address[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;
}

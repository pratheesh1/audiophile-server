import { IsInt, IsDefined, IsString, IsDate } from "class-validator";
import "./";

export class EmailValidatonToken {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    token!: string;

    @IsDefined()
    @IsDate()
    createdAt!: Date;
}

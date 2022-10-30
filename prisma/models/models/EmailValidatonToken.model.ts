import { IsInt, IsDefined, IsString, IsDate } from "class-validator";
import { User } from "./";

export class EmailValidatonToken {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    token!: string;

    @IsDefined()
    User!: User;

    @IsDefined()
    @IsInt()
    userId!: number;

    @IsDefined()
    @IsDate()
    createdAt!: Date;
}

import { IsInt, IsDefined, IsString, IsDate } from "class-validator";
import { User } from "./";

export class EmailValidator {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    user!: User;

    @IsDefined()
    @IsInt()
    userId!: number;

    @IsDefined()
    @IsString()
    token!: string;

    @IsDefined()
    @IsDate()
    createdAt!: Date;
}

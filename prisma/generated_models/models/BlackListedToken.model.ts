import { IsInt, IsDefined, IsString, IsDate } from "class-validator";
import "./";

export class BlackListedToken {
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

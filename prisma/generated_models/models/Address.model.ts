import { IsInt, IsDefined, IsString, IsDate } from "class-validator";
import { Country, User } from "./";

export class Address {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsString()
    address!: string;

    @IsDefined()
    @IsString()
    city!: string;

    @IsDefined()
    @IsString()
    state!: string;

    @IsDefined()
    country!: Country;

    @IsDefined()
    @IsInt()
    countryId!: number;

    @IsDefined()
    @IsString()
    zip!: string;

    @IsDefined()
    User!: User;

    @IsDefined()
    @IsInt()
    userId!: number;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}

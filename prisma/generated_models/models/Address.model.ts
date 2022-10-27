import { IsInt, IsDefined, IsString, IsOptional, IsDate } from "class-validator";
import { User, Country } from "./";

export class Address {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsInt()
    userId!: number;

    @IsDefined()
    user!: User;

    @IsDefined()
    @IsString()
    apartment!: string;

    @IsDefined()
    @IsString()
    street!: string;

    @IsDefined()
    @IsString()
    city!: string;

    @IsOptional()
    @IsString()
    state?: string;

    @IsDefined()
    country!: Country;

    @IsDefined()
    @IsString()
    zip!: string;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsInt()
    countryId!: number;
}

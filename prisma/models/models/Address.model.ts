import { IsInt, IsDefined, IsString, IsDate } from "class-validator";
import { Country, User, Order } from "./";

export class Address {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    lineOne!: string;

    @IsDefined()
    @IsString()
    street!: string;

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
    Order!: Order[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}

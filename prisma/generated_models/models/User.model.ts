import { IsInt, IsDefined, IsString, IsOptional, IsBoolean, IsIn, IsDate } from "class-validator";
import { Address, Cart, EmailValidator } from "./";
import { getEnumValues } from "../helpers";
import { UserRole } from "../enums";

export class User {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    email!: string;

    @IsDefined()
    @IsString()
    firstName!: string;

    @IsDefined()
    @IsString()
    lastName!: string;

    @IsDefined()
    @IsString()
    password!: string;

    @IsOptional()
    @IsString()
    imageUri?: string;

    @IsDefined()
    @IsBoolean()
    isVerified!: boolean;

    @IsDefined()
    @IsIn(getEnumValues(UserRole))
    userRole!: UserRole;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsDefined()
    Address!: Address[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsDefined()
    Cart!: Cart[];

    @IsDefined()
    EmailValidator!: EmailValidator[];
}

import { IsInt, IsDefined, IsString, IsOptional, IsIn, IsBoolean, IsDate } from "class-validator";
import { EmailValidatonToken, Address, Product, Cart, Order, UserOrder, Voucher } from "./";
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
    password!: string;

    @IsDefined()
    @IsString()
    firstName!: string;

    @IsOptional()
    @IsString()
    middleName?: string;

    @IsDefined()
    @IsString()
    lastName!: string;

    @IsOptional()
    @IsString()
    imageUri?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsDefined()
    @IsIn(getEnumValues(UserRole))
    role!: UserRole;

    @IsDefined()
    @IsBoolean()
    isVerified!: boolean;

    @IsDefined()
    EmailValidatonToken!: EmailValidatonToken[];

    @IsDefined()
    Address!: Address[];

    @IsDefined()
    Product!: Product[];

    @IsDefined()
    Cart!: Cart[];

    @IsDefined()
    Order!: Order[];

    @IsDefined()
    UserOrder!: UserOrder[];

    @IsDefined()
    Voucher!: Voucher[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}

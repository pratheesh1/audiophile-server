import { IsInt, IsDefined, IsString, IsOptional, IsIn, IsDate } from "class-validator";
import { User, Address, UserOrder, OrderItem } from "./";
import { getEnumValues } from "../helpers";
import { OrderStatus } from "../enums";

export class Order {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    status!: string;

    @IsDefined()
    User!: User;

    @IsDefined()
    @IsInt()
    userId!: number;

    @IsDefined()
    Address!: Address;

    @IsDefined()
    @IsInt()
    addressId!: number;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsString()
    paymentId?: string;

    @IsDefined()
    @IsIn(getEnumValues(OrderStatus))
    orderStatus!: OrderStatus;

    @IsDefined()
    UserOrder!: UserOrder[];

    @IsDefined()
    OrderItem!: OrderItem[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}

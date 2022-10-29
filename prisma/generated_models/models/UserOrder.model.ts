import { IsInt, IsDefined, IsDate } from "class-validator";
import { User, Order } from "./";

export class UserOrder {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    User!: User;

    @IsDefined()
    @IsInt()
    userId!: number;

    @IsDefined()
    Order!: Order;

    @IsDefined()
    @IsInt()
    orderId!: number;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}

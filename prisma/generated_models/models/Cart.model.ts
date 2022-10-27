import { IsInt, IsDefined, IsDate } from "class-validator";
import { User, CartItems } from "./";

export class Cart {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    user!: User;

    @IsDefined()
    @IsInt()
    userId!: number;

    @IsDefined()
    items!: CartItems[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}

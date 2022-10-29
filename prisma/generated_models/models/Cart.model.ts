import { IsInt, IsDefined, IsDate } from "class-validator";
import { User, CartItem } from "./";

export class Cart {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    User!: User;

    @IsDefined()
    @IsInt()
    userId!: number;

    @IsDefined()
    CartItem!: CartItem[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}

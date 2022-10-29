import { IsInt, IsDefined, IsString, IsDate } from "class-validator";
import { Brand, Category, User, ProductVariant, ProductProperty, ProductImage, CartItem, OrderItem, Voucher } from "./";

export class Product {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsString()
    description!: string;

    @IsDefined()
    price!: number;

    @IsDefined()
    Brand!: Brand;

    @IsDefined()
    @IsInt()
    brandId!: number;

    @IsDefined()
    @IsInt()
    quantity!: number;

    @IsDefined()
    @IsString()
    sku!: string;

    @IsDefined()
    Category!: Category;

    @IsDefined()
    @IsInt()
    categoryId!: number;

    @IsDefined()
    User!: User;

    @IsDefined()
    @IsInt()
    userId!: number;

    @IsDefined()
    ProductVariant!: ProductVariant[];

    @IsDefined()
    ProductProperty!: ProductProperty[];

    @IsDefined()
    ProductImage!: ProductImage[];

    @IsDefined()
    CartItem!: CartItem[];

    @IsDefined()
    OrderItem!: OrderItem[];

    @IsDefined()
    Voucher!: Voucher[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}

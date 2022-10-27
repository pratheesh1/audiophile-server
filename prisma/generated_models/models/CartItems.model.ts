import { IsInt, IsDefined, IsDate } from "class-validator";
import { Product, ProductVariant, Cart } from "./";

export class CartItems {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    product!: Product;

    @IsDefined()
    @IsInt()
    productId!: number;

    @IsDefined()
    productVariant!: ProductVariant;

    @IsDefined()
    @IsInt()
    productVariantId!: number;

    @IsDefined()
    cart!: Cart;

    @IsDefined()
    @IsInt()
    cartId!: number;

    @IsDefined()
    @IsInt()
    quantity!: number;

    @IsDefined()
    originalPrice!: number;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}

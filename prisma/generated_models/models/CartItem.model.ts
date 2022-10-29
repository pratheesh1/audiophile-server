import { IsInt, IsDefined, IsOptional, IsDate } from "class-validator";
import { Cart, Product, ProductVariant } from "./";

export class CartItem {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsInt()
    quantity!: number;

    @IsDefined()
    originalPrice!: number;

    @IsDefined()
    Cart!: Cart;

    @IsDefined()
    @IsInt()
    cartId!: number;

    @IsDefined()
    Product!: Product;

    @IsDefined()
    @IsInt()
    productId!: number;

    @IsOptional()
    ProductVariant?: ProductVariant;

    @IsOptional()
    @IsInt()
    productVariantId?: number;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}

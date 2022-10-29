import { IsInt, IsDefined, IsOptional, IsDate } from "class-validator";
import { Order, Product, ProductVariant } from "./";

export class OrderItem {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsInt()
    quantity!: number;

    @IsDefined()
    salePrice!: number;

    @IsDefined()
    Order!: Order;

    @IsDefined()
    @IsInt()
    orderId!: number;

    @IsDefined()
    Product!: Product;

    @IsOptional()
    ProductVariant?: ProductVariant;

    @IsOptional()
    @IsInt()
    productVariantId?: number;

    @IsDefined()
    @IsInt()
    productId!: number;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}

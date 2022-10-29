import { IsInt, IsDefined, IsString, IsOptional, IsDate } from "class-validator";
import { Product, ProductVariantProperty, ProductVariantImage, Voucher, CartItem, OrderItem } from "./";

export class ProductVariant {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsDefined()
    price!: number;

    @IsDefined()
    @IsInt()
    quantity!: number;

    @IsDefined()
    @IsString()
    sku!: string;

    @IsDefined()
    Product!: Product;

    @IsDefined()
    @IsInt()
    productId!: number;

    @IsDefined()
    ProductVariantProperty!: ProductVariantProperty[];

    @IsDefined()
    ProductVariantImage!: ProductVariantImage[];

    @IsDefined()
    Voucher!: Voucher[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsDefined()
    CartItem!: CartItem[];

    @IsDefined()
    OrderItem!: OrderItem[];
}

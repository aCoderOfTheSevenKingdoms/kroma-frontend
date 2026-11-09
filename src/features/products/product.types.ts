export type ProductVariant = {
    _id?: string;
    sku: string;
    size: string;
    color: string;
    price: number;
    stock: number;
    images: string[];
};

export type Product = {
    _id?: string;
    title: string;
    slug: string;
    description: string;
    seller: string;
    category: string;
    basePrice: number;
    attributes: Record<string, string>;
    variants: ProductVariant[];
    isActive: boolean;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
};

export type CreateProductVariantPayload = {
    sku: string;
    size: string;
    color: string;
    price: number;
    stock?: number;
    images?: Array<string | number>;
};

export type CreateProductPayload = {
    title: string;
    slug?: string;
    description: string;
    category: string;
    basePrice: number;
    attributes?: Record<string, string>;
    variants: CreateProductVariantPayload[];
    isActive?: boolean;
    images?: File[];
};

export type CreateProductResponse = {
    message: string;
    product: Product;
};

export type GetProductsResponse = {
    message: string;
    success: boolean;
    products: Product[];
};

import axios from 'axios';
import type {
    AddVariantPayload,
    AddVariantResponse,
    CreateProductPayload,
    CreateProductResponse,
    GetAllProductsResponse,
    GetProductsResponse,
    UpdateProductPayload,
    UpdateProductResponse,
} from '../product.types';

const productApiInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/products`,
    withCredentials: true
});

function buildProductFormData(
    createProductPayload: CreateProductPayload
): FormData {
    const formData = new FormData();

    formData.append("title", createProductPayload.title);
    formData.append("description", createProductPayload.description);
    formData.append("category", createProductPayload.category);
    formData.append("basePrice", String(createProductPayload.basePrice));
    formData.append("attributes", JSON.stringify(createProductPayload.attributes ?? {}));
    formData.append("variants", JSON.stringify(createProductPayload.variants));

    if (createProductPayload.isActive !== undefined) {
        formData.append("isActive", String(createProductPayload.isActive));
    }

    createProductPayload.images?.forEach((image) => {
        formData.append("images", image);
    });

    return formData;
}

function buildAddVariantFormData(
    addVariantPayload: AddVariantPayload
): FormData {
    const formData = new FormData();

    formData.append("variants", JSON.stringify(addVariantPayload.variants));

    addVariantPayload.images?.forEach((image) => {
        formData.append("images", image);
    });

    return formData;
}

export async function createProduct(
    createProductPayload: CreateProductPayload
): Promise<CreateProductResponse> {
    const response = await productApiInstance.post<CreateProductResponse>(
        "/create-product",
        buildProductFormData(createProductPayload)
    );
    return response.data;
}

export async function updateProduct(
    slug: string,
    updateProductPayload: UpdateProductPayload
): Promise<UpdateProductResponse> {
    const response = await productApiInstance.put<UpdateProductResponse>(
        `/${encodeURIComponent(slug)}`,
        buildProductFormData(updateProductPayload)
    );
    return response.data;
}

export async function addVariant(
    slug: string,
    addVariantPayload: AddVariantPayload
): Promise<AddVariantResponse> {
    const response = await productApiInstance.patch<AddVariantResponse>(
        `/${encodeURIComponent(slug)}`,
        buildAddVariantFormData(addVariantPayload)
    );
    return response.data;
}

export async function getProductsForSeller(): Promise<GetProductsResponse> {
    const response = await productApiInstance.get<GetProductsResponse>("/seller");
    return response.data;
}

export async function getAllProducts(): Promise<GetAllProductsResponse> {
    const response = await productApiInstance.get<GetAllProductsResponse>("/");
    return response.data;
}
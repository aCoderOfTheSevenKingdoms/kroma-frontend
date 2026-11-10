import axios from 'axios';
import type {
    CreateProductPayload,
    CreateProductResponse,
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

export async function getProductsForSeller(): Promise<GetProductsResponse> {
    const response = await productApiInstance.get<GetProductsResponse>("/seller");
    return response.data;
}

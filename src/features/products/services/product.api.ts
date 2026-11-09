import axios from 'axios';
import type {
    CreateProductPayload,
    CreateProductResponse,
    GetProductsResponse,
} from '../product.types';

const productApiInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/products`,
    withCredentials: true
});

export async function createProduct(
    createProductPayload: CreateProductPayload
): Promise<CreateProductResponse> {
    const formData = new FormData();

    formData.append("title", createProductPayload.title);

    if (createProductPayload.slug?.trim()) {
        formData.append("slug", createProductPayload.slug);
    }

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

    const response = await productApiInstance.post<CreateProductResponse>(
        "/create-product",
        formData
    );
    return response.data;
}

export async function getProductsForSeller(): Promise<GetProductsResponse> {
    const response = await productApiInstance.get<GetProductsResponse>("/seller");
    return response.data;
}

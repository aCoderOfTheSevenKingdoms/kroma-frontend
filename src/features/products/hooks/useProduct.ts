import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/app.store";
import { useToast } from "@/features/toast/hook/useToast";
import { getApiErrorMessage } from "@/features/auth/service/auth.api";
import { createProduct, getProductsForSeller } from "../services/product.api";
import { setError, setLoading, setSellerProducts } from "../state/product.slice";
import type { CreateProductPayload, Product } from "../product.types";

export type ProductActionResult = {
    success: boolean;
    message?: string;
}

export const useProduct = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const { sellerProducts, loading, error } = useSelector((state: RootState) => state.product);

    const handleCreateProduct = useCallback(async (createProductPayload: CreateProductPayload): Promise<ProductActionResult> => {
        dispatch(setLoading(true));
        dispatch(setError(false));

        try {
            const data = await createProduct(createProductPayload);
            toast.success("Product created", data.message);
            return {success: true, message: data.message};
        } catch (err) {
            const message = getApiErrorMessage(err);
            toast.error("Failed to create product", message);
            dispatch(setError(true));
            return {success: false, message};
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handleGetSellerProducts = useCallback(async (): Promise<ProductActionResult> => {
        dispatch(setLoading(true));
        dispatch(setError(false));

        try {
            const data = await getProductsForSeller();
            const productsBySlug = data.products.reduce<Record<string, Product>>((map, product) => {
                map[product.slug] = product;
                return map;
            }, {});
            dispatch(setSellerProducts(productsBySlug));
            return {success: true, message: data.message};
        } catch (err) {
            const message = getApiErrorMessage(err);
            toast.error("Failed to fetch products", message);
            dispatch(setError(true));
            return {success: false, message};
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    return {
        sellerProducts,
        loading,
        error,
        handleCreateProduct,
        handleGetSellerProducts,
    }
}

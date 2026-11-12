import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/app.store";
import { useToast } from "@/features/toast/hook/useToast";
import { getApiErrorMessage } from "@/features/auth/service/auth.api";
import { createProduct, getProductsForSeller, addVariant, updateProduct } from "../services/product.api";
import { removeProduct, setError, setLoading, setSellerProducts, upsertProduct } from "../state/product.slice";
import type { AddVariantPayload, CreateProductPayload, Product, UpdateProductPayload } from "../product.types";

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
            dispatch(upsertProduct(data.product));
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
    }, [dispatch, toast]);

    const handleUpdateProduct = useCallback(async (slug: string, updateProductPayload: UpdateProductPayload): Promise<ProductActionResult> => {
        dispatch(setLoading(true));
        dispatch(setError(false));

        try {
            const data = await updateProduct(slug, updateProductPayload);
            if (slug !== data.product.slug) {
                dispatch(removeProduct(slug));
            }
            dispatch(upsertProduct(data.product));
            toast.success("Product updated", data.message);
            return {success: true, message: data.message};
        } catch (err) {
            const message = getApiErrorMessage(err);
            toast.error("Failed to update product", message);
            dispatch(setError(true));
            return {success: false, message};
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, toast]);

    const handleAddVariant = useCallback(async (slug: string, addVariantPayload: AddVariantPayload): Promise<ProductActionResult> => {
        dispatch(setLoading(true));
        dispatch(setError(false));

        try {
            const data = await addVariant(slug, addVariantPayload);
            dispatch(upsertProduct(data.product));
            toast.success("Variant added", data.message);
            return {success: true, message: data.message};
        } catch (err) {
            const message = getApiErrorMessage(err);
            toast.error("Failed to add variant", message);
            dispatch(setError(true));
            return {success: false, message};
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, toast]);

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
    }, [dispatch, toast]);

    return {
        sellerProducts,
        loading,
        error,
        handleCreateProduct,
        handleUpdateProduct,
        handleAddVariant,
        handleGetSellerProducts,
    }
}

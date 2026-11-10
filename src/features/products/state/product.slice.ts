import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../product.types";

type ProductState = {
    sellerProducts: Record<string, Product>;
    loading: boolean;
    error: boolean;
}

const initialState: ProductState = {
    sellerProducts: {},
    loading: false,
    error: false
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSellerProducts: (state, action: PayloadAction<Record<string, Product>>) => {
            state.sellerProducts = action.payload;
        },
        upsertProduct: (state, action: PayloadAction<Product>) => {
            state.sellerProducts[action.payload.slug] = action.payload;
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            delete state.sellerProducts[action.payload];
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<boolean>) => {
            state.error = action.payload;
        }
    }
})

export const { setSellerProducts, upsertProduct, removeProduct, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;

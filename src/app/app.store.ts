import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/auth.slice";
import productReducer from "../features/products/state/product.slice";
import toastReducer from "../features/toast/state/toast.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        toast: toastReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
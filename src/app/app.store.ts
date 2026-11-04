import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/auth.slice";
import toastReducer from "../features/toast/state/toast.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        toast: toastReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../auth.types";

type AuthState = {
    user: User | null;
    loading: boolean;
    initialized: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    initialized: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setInitialized: (state, action: PayloadAction<boolean>) => {
            state.initialized = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
})

export const {setError, setLoading, setUser, setInitialized} = authSlice.actions;
export default authSlice.reducer;

import {createSlice, nanoid, type PayloadAction} from "@reduxjs/toolkit";
import type { ToastItem, ToastPayload } from "../toast.types";

type ToastState = {
    queue: ToastItem[];
};

const initialState: ToastState = {
    queue: []
};

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        showToast: {
            reducer(state, action: PayloadAction<ToastItem>) {
                state.queue.push(action.payload);
            },
            prepare(payload: ToastPayload) {
                return {
                    payload: {
                        ...payload,
                        id: nanoid(),
                        variant: payload.variant ?? "info"
                    }
                }
            }
        },
        dismissToast(state, action: PayloadAction<string>) {
            state.queue = state.queue.filter((item) => item.id !== action.payload);
        },
        clearToasts(state) {
            state.queue = [];
        }
    }
})

export const {showToast, dismissToast, clearToasts} = toastSlice.actions;
export default toastSlice.reducer;
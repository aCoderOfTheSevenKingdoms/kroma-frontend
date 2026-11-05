import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setError, setInitialized, setLoading, setUser } from "../state/auth.slice";
import {
    getApiErrorMessage,
    getCurrentUser,
    login,
    loginWithGoogle,
    logout,
    register,
} from "../service/auth.api";
import type {
    AuthActionResult,
    LoginPayload,
    RegisterPayload,
} from "../auth.types";
import { useToast } from "@/features/toast/hook/useToast";

export const useAuth = () => {

    const dispatch = useDispatch();
    const toast = useToast();

    const bootstrap = useCallback(async () => {
        dispatch(setLoading(true));

        try {
            const data = await getCurrentUser();
            dispatch(setUser(data.user));
        } catch {
            dispatch(setUser(null));
        } finally {
            dispatch(setLoading(false));
            dispatch(setInitialized(true));
        }
    }, [dispatch]);

    const handleRegister = useCallback(async (registerPayload: RegisterPayload): Promise<AuthActionResult> => {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const data = await register(registerPayload);
            toast.success("Account created", "Check your email to verify your account.");
            return {success: true, message: data.message};
        } catch (error) {
            const message = getApiErrorMessage(error);
            toast.error("Authentication failed", message);
            dispatch(setError(message));
            return {success: false, message};
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handleLogin = useCallback(async (loginPayload: LoginPayload): Promise<AuthActionResult> => {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const data = await login(loginPayload);
            toast.success("Signed in successfully");
            dispatch(setUser(data.user));
            return {success: true, message: data.message};
        } catch (error) {
            const message = getApiErrorMessage(error);
            toast.error("Authentication failed", message);
            dispatch(setError(message));
            return {success: false, message};
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handleGoogleLogin = useCallback(() => {
        loginWithGoogle();
    }, []);

    const handleLogout = useCallback(async (): Promise<AuthActionResult> => {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            await logout();
            dispatch(setUser(null));
            toast.success("Signed out successfully");
            return {success: true, message: "Logged out successfully"};
        } catch (error) {
            const message = getApiErrorMessage(error);
            toast.error("Logout failed", message);
            dispatch(setError(message));
            return {success: false, message};
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    return {
        handleRegister,
        handleLogin,
        handleGoogleLogin,
        handleLogout,
        bootstrap,
    }
}

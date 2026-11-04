import axios from 'axios';
import type {
    AuthResponse,
    CurrentUserResponse,
    LoginPayload,
    RegisterPayload,
} from '../auth.types';

const authApiInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/auth`,
    withCredentials: true
});

export async function register(registerPayload: RegisterPayload): Promise<AuthResponse> {
   const response = await authApiInstance.post<AuthResponse>("/register", registerPayload);
   return response.data;
}

export async function login(loginPayload: LoginPayload): Promise<AuthResponse> {
   const response = await authApiInstance.post<AuthResponse>("/login", loginPayload);
   return response.data;
}

export async function getCurrentUser(): Promise<CurrentUserResponse> {
   const response = await authApiInstance.get<CurrentUserResponse>("/me");
   return response.data;
}

export function loginWithGoogle(): void {
   window.location.assign(`${import.meta.env.VITE_API_BASE_URL}/api/auth/google`);
}

export function getApiErrorMessage(error: unknown): string {
   if (axios.isAxiosError(error)) {
      const data = error.response?.data as
         | { error?: string; errors?: Array<{ msg?: string }> }
         | undefined;

      if (data?.error) {
         return data.error;
      }

      if (data?.errors?.[0]?.msg) {
         return data.errors[0].msg;
      }

      return error.message;
   }

   if (error instanceof Error) {
      return error.message;
   }

   return "Something went wrong. Please try again.";
}

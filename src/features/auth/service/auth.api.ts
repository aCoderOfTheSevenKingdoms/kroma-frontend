import axios from 'axios';

const authApiInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/auth`,
    withCredentials: true
});

type RegisterPayload = {
    email: string;
    contact: string;
    password: string;
    fullname: string;
}

type LoginPayload = {
    email: string;
    password: string;
}

export async function register(registerPayload: RegisterPayload) {
   const response = await authApiInstance.post("/register", registerPayload);
   return response.data;
}

export async function login(loginPayload: LoginPayload) {
   const response = await authApiInstance.post("/login", loginPayload);
   return response.data;
}


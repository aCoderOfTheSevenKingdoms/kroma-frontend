export type UserType = "buyer" | "seller";

export type User = {
    id: string;
    email: string;
    contact?: string;
    fullname: string;
    user_type: UserType;
}

export type RegisterPayload = {
    email: string;
    contact: string;
    password: string;
    fullname: string;
    isSeller: boolean;
}

export type LoginPayload = {
    email: string;
    password: string;
}

export type AuthResponse = {
    message: string;
    user: User;
}

export type CurrentUserResponse = {
    user: User;
}

export type AuthActionResult = {
    success: boolean;
    message?: string;
}

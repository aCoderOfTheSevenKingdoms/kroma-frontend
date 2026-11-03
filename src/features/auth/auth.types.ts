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
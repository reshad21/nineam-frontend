export type TLoginuser = {
    email: string;
    password: string;
};

export type TUser = {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: "admin" | "user";
};
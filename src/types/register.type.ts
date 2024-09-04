export type TLoginuser = {
    email: string;
    password: string;
};

export type TUser = {
    _id?: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: "admin" | "user";
};
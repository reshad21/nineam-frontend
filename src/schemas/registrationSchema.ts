import { z } from "zod";

// Define a Zod schema for the user registration form
export const registrationSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(50, "Name can't exceed 50 characters"),

    email: z
        .string()
        .email("Invalid email format")
        .nonempty("Email is required"),

    password: z
        .string()
        .min(6, "Password must be at least 8 characters long")
        .max(50, "Password can't exceed 50 characters"),

    phone: z
        .string()
        .regex(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits"),

    address: z
        .string()
        .min(5, "Address must be at least 5 characters long")
        .max(100, "Address can't exceed 100 characters")
});

// This type can be imported and used for form data typing if needed
// export type RegistrationSchemaType = z.infer<typeof registrationSchema>;

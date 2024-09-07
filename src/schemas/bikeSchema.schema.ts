import { z } from "zod";

export const bikeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    pricePerHour: z
        .string()
        .min(1, "Price per hour is required")
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val) && val > 0, {
            message: "Price per hour must be a positive number",
        }),
    cc: z
        .string()
        .min(1, "CC is required")
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val) && val > 0, {
            message: "CC must be a positive number",
        }),
    year: z
        .string()
        .min(4, "Year is required")
        .transform((val) => parseInt(val, 10))
        .refine((val) => !isNaN(val) && val >= 1900 && val <= new Date().getFullYear(), {
            message: "Year must be a valid year",
        }),
    model: z.string().min(1, "Model is required"),
    brand: z.string().min(1, "Brand is required"),
    image: z.string().url("Image must be a valid URL"),
});

import { z } from "zod";

export const bikeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    pricePerHour: z.number().positive("Price per hour must be a positive number"),
    cc: z.number().positive("CC must be a positive number"),
    year: z.number().int().min(1900, "Year must be a valid year").max(new Date().getFullYear(), "Year cannot be in the future"),
    model: z.string().min(1, "Model is required"),
    brand: z.string().min(1, "Brand is required"),
    image: z.string().url("Image must be a valid URL"),
});


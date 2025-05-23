import { z } from "zod";

export const createAdvertZodSchema = z.object({
  name: z.string().min(1, "The name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be greater than 0"),
  image: z.string().optional(),
  tags: z.string(),
  sale: z.enum(["sell", "buy"], {
    required_error: "Sale type is required",
  }),
  favorites: z.array(z.string()).optional(),
});

export const updateAdvertZodSchema = createAdvertZodSchema.partial();

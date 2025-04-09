import { z } from "zod";

export const createAdvertZodSchema = z.object({
  name: z.string().min(1, "The name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be greater than 0"),
  image: z.string().url("Must be a valid URL").optional(),
  tags: z.array(z.string()).optional(),
  sale: z.enum(["sell", "buy"], {
    required_error: "Sale type is required",
  }),
});

export const updateAdvertZodSchema = createAdvertZodSchema.partial();

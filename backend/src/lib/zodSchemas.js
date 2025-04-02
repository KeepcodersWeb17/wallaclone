import { z } from 'zod'

export const createAdvertZodSchema = z.object({
    name: z.string().min(1, 'Yhe name is required'),
    description: z.string().optional(),
    price: z.number().min(0, 'Price must be greater than 0'),
    image: z.
})
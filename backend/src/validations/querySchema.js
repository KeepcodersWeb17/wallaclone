import { z } from "zod";

export const queryZodSchema = z.object({
  username: z.string().optional(), // username=admin // username=admin, user1, user2
  favorite: z.string().optional(),
  name: z.string().optional(),
  price: z.string().optional(), // price=500-1000 // price=-1000 // price=1000- // price=1000
  tags: z.string().optional(),
  sale: z.enum(["sell", "buy"]).optional(),
  skip: z.string().optional(),
  limit: z.string().optional(),
  sort: z.string().optional(), // sort=name-asc, price-desc, etc.
  fields: z.string().optional(), // fields=name, price, tags, etc.
});

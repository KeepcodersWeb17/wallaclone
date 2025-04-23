import z from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters long" }),
  chats: z.array(z.string()).optional(),
});

export const loginSchema = userSchema.pick({
  username: true,
  password: true,
});

export const updateUserSchema = userSchema.partial();

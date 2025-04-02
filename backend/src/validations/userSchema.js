import z from "zod";

const userSchema = z.object({
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
});

export default userSchema;

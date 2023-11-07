import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(4, { message: "Name must be 4 character long" }),
  email: z.string().email().max(50),
  password: z
    .string()
    .min(6, { message: "Password must be 6 character long" })
    .max(50, {
      message: "Password must be between 6 and 50 characters",
    }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be 6 character long" })
    .max(50, {
      message: "Password must be between 6 and 50 characters",
    }),
}).refine((data)=>data.password===data.confirmPassword,{
    message:"Password and confirm password must be same",
    path:["confirmPassword"]
});


export type TSignUpSchema = z.infer<typeof signupSchema>;


export const loginSchema = z.object({
    email: z.string().email().max(50),
  password: z
    .string()
    .min(6, { message: "Password must be 6 character long" })
    .max(50, {
      message: "Password must be between 6 and 50 characters",
    }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const setNewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be 6 character long" })
    .max(50, {
      message: "Password must be between 6 and 50 characters",
    }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be 6 character long" })
    .max(50, {
      message: "Password must be between 6 and 50 characters",
    }),
}).refine((data)=>data.password===data.confirmPassword,{
    message:"Password and confirm password must be same",
    path:["confirmPassword"]
});

export type TSetNewPasswordSchema = z.infer<typeof setNewPasswordSchema>;
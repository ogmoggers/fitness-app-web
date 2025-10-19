import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().min(1, "Email обязателен").email("Некорректный email"),
    password: z
      .string()
      .min(8, "Пароль должен быть минимум 8 символов")
      .max(100, "Пароль слишком длинный"),
    confirmPassword: z.string().min(1, "Подтверждение пароля обязательно"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().min(1, "Email обязателен").email("Некорректный email"),
  password: z.string().min(1, "Пароль обязателен"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export const validateRegister = (data: unknown) => {
  return registerSchema.safeParse(data);
};

export const validateLogin = (data: unknown) => {
  return loginSchema.safeParse(data);
};

import { z } from 'zod';

export const signUpFormSchema = z
  .object({
    email: z.string().email({ message: 'Adres e-mail jest niepoprawny' }),
    password: z.string().min(1, { message: 'Hasło jest wymagane' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Potwierdzenie hasła jest wymagane' }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Hasła nie są takie same',
    path: ['confirmPassword'],
  });

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;

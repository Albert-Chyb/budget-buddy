import { z } from 'zod';

export const signUpFormSchema = z.object({
  email: z.string().email({ message: 'Adres e-mail jest niepoprawny' }),
  password: z.string().min(1, { message: 'Hasło jest wymagane' }),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;

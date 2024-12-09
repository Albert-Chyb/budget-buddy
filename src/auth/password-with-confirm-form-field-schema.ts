import { z } from 'zod';
import { passwordFormFieldSchema } from '@/auth/password-form-field-schema.ts';

export const passwordWithConfirmFormFieldSchema = z.object({
  password: passwordFormFieldSchema,
  confirmPassword: z.string().min(1, 'Potwierdź hasło'),
});

type Shape = typeof passwordWithConfirmFormFieldSchema.shape;

export function passwordsEqualRefinement(schema: z.ZodObject<Shape>) {
  return schema.refine(
    ({ password, confirmPassword }) => password === confirmPassword,
    {
      message: 'Hasła nie są takie same',
      path: ['confirmPassword'],
    },
  );
}
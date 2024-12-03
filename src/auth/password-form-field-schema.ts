import { z } from 'zod';
import { MINIMUM_PASSWORD_REQUIREMENTS } from '@/auth/password-requirements/minimum-password-requirements.ts';

export const passwordFormFieldSchema = z
  .string()
  .superRefine((password, context) => {
    for (const requirement of MINIMUM_PASSWORD_REQUIREMENTS)
      if (!requirement.check(password))
        context.addIssue({
          message: requirement.unfulfilledMessage,
          code: z.ZodIssueCode.custom,
        });
  });

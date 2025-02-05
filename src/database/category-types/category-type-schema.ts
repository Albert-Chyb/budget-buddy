import { z } from 'zod';

export const categoryTypeSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(32),
  is_expense: z.boolean(),
});
export type CategoryTypeSchema = z.infer<typeof categoryTypeSchema>;

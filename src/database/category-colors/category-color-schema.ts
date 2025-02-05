import { z } from 'zod';

const RGBColorPartSchema = z.number().int().min(0).max(255);

export const categoryColorSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(32),
  red: RGBColorPartSchema,
  green: RGBColorPartSchema,
  blue: RGBColorPartSchema,
});
export type CategoryColorSchema = z.infer<typeof categoryColorSchema>;

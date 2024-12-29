import { Tables } from '@/database/types.ts';
import { z } from 'zod';
import { numericRecordIdSchema } from '@/database/numeric-record-id-schema.ts';

type SchemaWithValidKeys = z.ZodType<
  Record<keyof Tables<'category_colors'>, unknown>
>;

export const rgbColorPartSchema = z.number().int().min(0).max(255);

export const categoryColorSchema = z.object({
  id: numericRecordIdSchema,
  name: z.string().min(1).max(32),
  red: rgbColorPartSchema,
  green: rgbColorPartSchema,
  blue: rgbColorPartSchema,
}) satisfies SchemaWithValidKeys;

export type CategoryColor = z.infer<typeof categoryColorSchema>;

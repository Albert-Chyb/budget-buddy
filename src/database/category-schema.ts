import { Tables } from '@/database/types.ts';
import { z } from 'zod';
import { numericRecordIdSchema } from '@/database/numeric-record-id-schema.ts';
import { categoryColorSchema } from '@/database/category-color-schema.ts';
import { categoryTypeSchema } from '@/database/category-type-schema.ts';

export const CATEGORY_NAME_LENGTH_CONSTRAINT = {
  min: 1,
  max: 64,
} as const;

type SchemaWithValidKeys = z.ZodType<
  Record<keyof Tables<'categories'>, unknown>
>;

export const categorySchema = z.object({
  id: numericRecordIdSchema,
  name: z
    .string()
    .min(CATEGORY_NAME_LENGTH_CONSTRAINT.min)
    .max(CATEGORY_NAME_LENGTH_CONSTRAINT.max),
  owner_id: z.string(),
  type_id: categoryTypeSchema.shape.id,
  color_id: categoryColorSchema.shape.id
    .nullable()
    .transform((value) => value ?? ''),
  parent_category_id: numericRecordIdSchema
    .nullable()
    .transform((value) => value ?? ''),
}) satisfies SchemaWithValidKeys;

export type Category = z.infer<typeof categorySchema>;

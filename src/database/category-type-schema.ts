import { Tables } from '@/database/types.ts';
import { z } from 'zod';
import { numericRecordIdSchema } from '@/database/numeric-record-id-schema.ts';

type SchemaWithValidKeys = z.ZodType<
  Record<keyof Tables<'category_types'>, unknown>
>;

export const categoryTypeSchema = z.object({
  id: numericRecordIdSchema,
  name: z.string().min(1).max(32),
  is_expense: z.boolean(),
}) satisfies SchemaWithValidKeys;

export type CategoryType = z.infer<typeof categoryTypeSchema>;

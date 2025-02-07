import { z } from 'zod';

export const paginationPageSizeSchema = z.union([
  z.literal(5),
  z.literal(10),
  z.literal(50),
  z.literal(100),
]);
export type PaginationPageSize = z.infer<typeof paginationPageSizeSchema>;

export const DEFAULT_PAGE_SIZE: PaginationPageSize = 10;

export const pageSizeSchema = paginationPageSizeSchema
  .default(DEFAULT_PAGE_SIZE)
  .catch(DEFAULT_PAGE_SIZE);

export const pageIndexSchema = z.number().int().min(0).default(0);

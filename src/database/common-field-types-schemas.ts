import { z } from 'zod';

/* Base type for a cell that holds a currency value */
export const currencyCellSchema = z.number().int();

/* Type for a cell that contains a key defined as an integer  */
export const numericIdSchema = z.number().int().positive();

/* Type for a cell that contains a PostgresSQL uuid type */
export const uuidSchema = z.string();

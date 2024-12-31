import { z } from 'zod';

export const idSchema = z.number().int();

export const nameSchema = z
  .string()
  .min(1, 'Nazwa kategorii jest wymagana')
  .max(64, `Nazwa kategorii nie może być dłuższa niż 64 znaki`);

export const typeIdSchema = z.number({ message: 'Wybierz typ transakcji' });

export const colorIdSchema = z.number().nullable();

export const ownerIdSchema = z.string();

export const parentCategoryIdSchema = z.number().nullable();

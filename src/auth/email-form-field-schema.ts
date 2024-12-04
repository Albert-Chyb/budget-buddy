import { z } from 'zod';

export const emailFormFieldSchema = z
  .string()
  .email({ message: 'Adres e-mail jest niepoprawny' });
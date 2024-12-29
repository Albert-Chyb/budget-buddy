import {
  CategoryType,
  categoryTypeSchema,
} from '@/database/category-type-schema.ts';
import {
  CategoryColor,
  categoryColorSchema,
} from '@/database/category-color-schema.ts';

export const categoryTypes: CategoryType[] = [
  {
    id: 1,
    name: 'Wydatek',
    is_expense: true,
  },
  {
    id: 2,
    name: 'Przychód',
    is_expense: false,
  },
].map((type) => categoryTypeSchema.parse(type));

export const colors: CategoryColor[] = [
  {
    blue: 100,
    green: 150,
    id: 1,
    name: 'Color One',
    red: 200,
  },
  {
    blue: 50,
    green: 75,
    id: 2,
    name: 'Color Two',
    red: 125,
  },
  {
    blue: 200,
    green: 100,
    id: 3,
    name: 'Color Three',
    red: 50,
  },
].map((color) => categoryColorSchema.parse(color));

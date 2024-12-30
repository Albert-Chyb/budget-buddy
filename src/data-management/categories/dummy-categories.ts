import {
  CategoryType,
  categoryTypeSchema,
} from '@/database/category-type-schema.ts';

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

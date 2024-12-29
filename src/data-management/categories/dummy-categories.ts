import {
  CategoryType,
  categoryTypeSchema,
} from '@/database/category-type-schema.ts';
import { Category, categorySchema } from '@/database/category-schema.ts';
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

export const categories: Category[] = [
  {
    color_id: null,
    id: 1,
    name: 'Item One',
    owner_id: 'owner123',
    parent_category_id: null,
    type_id: 1,
  },
  {
    color_id: 1,
    id: 2,
    name: 'Item Two',
    owner_id: 'owner123',
    parent_category_id: null,
    type_id: 2,
  },
  {
    color_id: null,
    id: 3,
    name: 'Item Three',
    owner_id: 'owner123',
    parent_category_id: null,
    type_id: 2,
  },
  {
    color_id: 2,
    id: 4,
    name: 'Item Four',
    owner_id: 'owner123',
    parent_category_id: null,
    type_id: 1,
  },
  {
    color_id: 3,
    id: 5,
    name: 'Item Five',
    owner_id: 'owner123',
    parent_category_id: null,
    type_id: 1,
  },
].map((category) => categorySchema.parse(category));

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

import { CategoryType } from '@/data-management/categories/data-mutation/category-form-schema.ts';

export interface CategoryColor {
  rgb: [string, string, string];
  name: string;
}
export interface Category {
  name: string;
  type: CategoryType;
  color: CategoryColor;
}

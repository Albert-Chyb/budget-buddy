export type CategoryType = 'income' | 'expense';
export interface CategoryColor {
  rgb: [string, string, string];
  name: string;
}
export interface Category {
  name: string;
  type: CategoryType;
  color: CategoryColor;
}

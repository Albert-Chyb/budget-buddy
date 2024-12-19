import { Category } from '@/data-management/categories/category-type.ts';

export const categories: Category[] = [
  {
    name: 'Salary',
    type: 'income',
    color: { rgb: ['0', '128', '0'], name: 'Green' },
  },
  {
    name: 'Freelance',
    type: 'income',
    color: { rgb: ['34', '139', '34'], name: 'Forest Green' },
  },
  {
    name: 'Investments',
    type: 'income',
    color: { rgb: ['46', '139', '87'], name: 'Sea Green' },
  },
  {
    name: 'Business',
    type: 'income',
    color: { rgb: ['50', '205', '50'], name: 'Lime Green' },
  },
  {
    name: 'Gifts',
    type: 'income',
    color: { rgb: ['0', '255', '127'], name: 'Spring Green' },
  },
  {
    name: 'Food',
    type: 'expense',
    color: { rgb: ['255', '0', '0'], name: 'Red' },
  },
  {
    name: 'Transport',
    type: 'expense',
    color: { rgb: ['255', '69', '0'], name: 'Orange Red' },
  },
  {
    name: 'Utilities',
    type: 'expense',
    color: { rgb: ['255', '140', '0'], name: 'Dark Orange' },
  },
  {
    name: 'Rent',
    type: 'expense',
    color: { rgb: ['255', '165', '0'], name: 'Orange' },
  },
  {
    name: 'Entertainment',
    type: 'expense',
    color: { rgb: ['255', '215', '0'], name: 'Gold' },
  },
  {
    name: 'Education',
    type: 'expense',
    color: { rgb: ['218', '165', '32'], name: 'Goldenrod' },
  },
  {
    name: 'Healthcare',
    type: 'expense',
    color: { rgb: ['255', '20', '147'], name: 'Deep Pink' },
  },
  {
    name: 'Insurance',
    type: 'expense',
    color: { rgb: ['128', '0', '128'], name: 'Purple' },
  },
  {
    name: 'Shopping',
    type: 'expense',
    color: { rgb: ['199', '21', '133'], name: 'Medium Violet Red' },
  },
  {
    name: 'Subscriptions',
    type: 'expense',
    color: { rgb: ['75', '0', '130'], name: 'Indigo' },
  },
  {
    name: 'Savings',
    type: 'income',
    color: { rgb: ['0', '191', '255'], name: 'Deep Sky Blue' },
  },
  {
    name: 'Bonuses',
    type: 'income',
    color: { rgb: ['135', '206', '250'], name: 'Light Sky Blue' },
  },
  {
    name: 'Donations',
    type: 'expense',
    color: { rgb: ['220', '20', '60'], name: 'Crimson' },
  },
  {
    name: 'Debt Repayment',
    type: 'expense',
    color: { rgb: ['178', '34', '34'], name: 'Firebrick' },
  },
  {
    name: 'Others',
    type: 'expense',
    color: { rgb: ['112', '128', '144'], name: 'Slate Gray' },
  },
];

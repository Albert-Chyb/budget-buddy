import { CategoryColor } from '@/database/category-colors/query.ts';

interface CategoryColorCellProps {
  categoryColor: CategoryColor | null;
}

export const CategoryColorCell = ({
  categoryColor,
}: CategoryColorCellProps) => {
  if (!categoryColor) return '-';

  const { name, red, green, blue } = categoryColor;

  return (
    <span
      className='border-2 py-1 px-2 rounded-[var(--radius)]'
      style={{
        borderColor: `rgb(${red}, ${green}, ${blue})`,
      }}
    >
      {name}
    </span>
  );
};

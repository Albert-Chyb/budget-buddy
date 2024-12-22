import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select.tsx';
import { PAGINATION_PAGE_SIZES } from '@/data-management/pagination/pagination-state.ts';
import { Table } from '@tanstack/react-table';

const PAGE_SIZE_OPTIONS = PAGINATION_PAGE_SIZES.map((pageSize) => (
  <SelectItem value={String(pageSize)}>{pageSize} wierszy na stronę</SelectItem>
));

export interface PageSizeSelectProps {
  table: Table<unknown>;
}
export const PageSizeSelect = ({ table }: PageSizeSelectProps) => {
  const { pageSize } = table.getState().pagination;
  return (
    <Select
      value={String(pageSize)}
      onValueChange={(newPageSize) => table.setPageSize(Number(newPageSize))}
    >
      <SelectTrigger
        className='w-min'
        aria-label='Ilość wierszy na stronie'
      >
        <SelectValue placeholder='Ilość wierszy na stronie' />
      </SelectTrigger>

      <SelectContent>{PAGE_SIZE_OPTIONS}</SelectContent>
    </Select>
  );
};

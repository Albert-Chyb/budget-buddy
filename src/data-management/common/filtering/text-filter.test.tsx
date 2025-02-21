import {
  Column,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { getByTestId, queryByTestId } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { TextFilter } from './text-filter';

type RowData = { name: string };
const columns = [
  createColumnHelper<RowData>().accessor('name', {
    id: 'name',
    filterFn: 'equalsString',
  }),
];
const rowAData = { name: 'a' };
const rowBData = { name: 'b' };
const data: [RowData, RowData] = [rowAData, rowBData] as const;

const Wrapper = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <TextFilter
        column={table.getColumn('name')! as Column<unknown>}
        labelContent=''
      />

      <table>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  data-testid={`fake-cell-${cell.row.original.name}`}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

describe('TextFilterComponent', () => {
  it('should change the column filter', async () => {
    const user = userEvent.setup();
    const { container } = render(<Wrapper />);
    const input = getByTestId(container, 'text-filter-input');

    await user.type(input, rowAData.name);

    expect(
      queryByTestId(container, `fake-cell-${rowAData.name}`),
    ).toBeInTheDocument();
    expect(
      queryByTestId(container, `fake-cell-${rowBData.name}`),
    ).not.toBeInTheDocument();
  });
});

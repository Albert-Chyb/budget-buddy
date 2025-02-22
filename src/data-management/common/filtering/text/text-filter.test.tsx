import {
  Column,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { getByTestId, queryByTestId } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { TextFilter } from './text-filter';

type RowData = { value: string };
const columns = [
  createColumnHelper<RowData>().accessor('value', {
    id: 'name',
    filterFn: 'equalsString',
  }),
];
const rowAData: RowData = { value: 'a' };
const rowBData: RowData = { value: 'b' };
const data: [RowData, RowData] = [rowAData, rowBData] as const;
const buildFakeRowTestId = (data: RowData) => `fake-row-${data.value}`;

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
          {table.getRowModel().rows.map(({ id, original }) => (
            <tr
              key={id}
              data-testid={buildFakeRowTestId(original)}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

describe('TextFilterComponent', () => {
  it('should filter out rows that do not match the filter value', async () => {
    const user = userEvent.setup();
    const { container } = render(<Wrapper />);
    const input = getByTestId(container, 'text-filter-input');

    await user.type(input, rowAData.value);

    expect(
      queryByTestId(container, buildFakeRowTestId(rowAData)),
    ).toBeInTheDocument();
    expect(
      queryByTestId(container, buildFakeRowTestId(rowBData)),
    ).not.toBeInTheDocument();
  });
});

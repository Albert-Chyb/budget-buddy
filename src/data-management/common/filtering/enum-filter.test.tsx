import {
  Column,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { getByTestId, queryByTestId, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { SingleEnumFilter } from './enum-filter';
import { EnumFilterOption } from './enum-filter-option';

type RowData = { value: string };
const colId = 'id';
const columns = [
  createColumnHelper<RowData>().accessor('value', {
    id: colId,
    filterFn: 'equalsString',
  }),
];
const rowAData: RowData = { value: 'a' };
const rowBData: RowData = { value: 'b' };
const data: [RowData, RowData] = [rowAData, rowBData];
const buildFakeRowTestId = (data: RowData) => `fake-row-${data.value}`;
const buildFilterOptionTestId = (data: RowData) =>
  `filter-option-${data.value}`;

const Wrapper = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <SingleEnumFilter
        column={table.getColumn(colId)! as Column<unknown>}
        labelContent=''
      >
        {data.map((item, index) => (
          <EnumFilterOption
            key={item.value}
            isFirst={index === 0}
            value={item.value}
            data-testid={buildFilterOptionTestId(item)}
          ></EnumFilterOption>
        ))}
      </SingleEnumFilter>

      <table>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const { id, original } = row;

            return (
              <tr
                key={id}
                data-testid={buildFakeRowTestId(original)}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const setupFnFactory = () => {
  return () => {
    const user = userEvent.setup();
    const { container } = render(<Wrapper />);
    const getRowA = () =>
      queryByTestId(container, buildFakeRowTestId(rowAData));
    const getRowB = () =>
      queryByTestId(container, buildFakeRowTestId(rowBData));
    const selectOption = async (option: RowData) => {
      await user.click(getByTestId(container, buildFilterOptionTestId(option)));
    };

    return {
      container,
      selectOption,
      getRowA,
      getRowB,
    };
  };
};

describe('EnumFilterComponent', () => {
  let setup: ReturnType<typeof setupFnFactory>;

  beforeEach(() => {
    setup = setupFnFactory();
  });

  it('should filter out the rows that do not match filter value', async () => {
    const { selectOption, getRowA, getRowB } = setup();

    await selectOption(rowAData);

    expect(getRowA()).toBeInTheDocument();
    expect(getRowB()).not.toBeInTheDocument();
  });
});

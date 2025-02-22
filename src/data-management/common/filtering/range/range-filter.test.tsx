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
import { RangeFilter } from './range-filter';

type RowData = { value: number };
const colId = 'id';
const columns = [
  createColumnHelper<RowData>().accessor('value', {
    id: colId,
    filterFn: 'inNumberRange',
  }),
];
const smallerNumber: RowData = { value: 10 };
const biggerNumber: RowData = { value: 20 };
const data: [RowData, RowData] = [smallerNumber, biggerNumber];

const Wrapper = () => {
  const table = useReactTable<RowData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <RangeFilter
        column={table.getColumn(colId)! as Column<unknown>}
        labelContent=''
      />

      <table>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              data-testid={`fake-row-${row.original.value}`}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

const setupFnFactory = () => {
  return () => {
    const user = userEvent.setup();
    const { container } = render(<Wrapper />);
    const minInput = getByTestId(container, 'range-filter-min-input');
    const maxInput = getByTestId(container, 'range-filter-max-input');

    const getRowWithSmallerNumber = () =>
      queryByTestId(container, `fake-row-${smallerNumber.value}`);

    const getRowWithBiggerNumber = () =>
      queryByTestId(container, `fake-row-${biggerNumber.value}`);

    return {
      user,
      container,
      minInput,
      maxInput,
      getRowWithSmallerNumber,
      getRowWithBiggerNumber,
    };
  };
};

describe('RangeFilter', () => {
  let setup: ReturnType<typeof setupFnFactory>;

  beforeEach(() => {
    setup = setupFnFactory();
  });

  it('should filter out the rows with values smaller than min filter value', async () => {
    const { minInput, user, getRowWithSmallerNumber, getRowWithBiggerNumber } =
      setup();

    await user.type(minInput, String(smallerNumber.value + 1));

    expect(getRowWithSmallerNumber()).not.toBeInTheDocument();
    expect(getRowWithBiggerNumber()).toBeInTheDocument();
  });

  it('should filter out the rows with values bigger that max filter value', async () => {
    const { maxInput, user, getRowWithBiggerNumber, getRowWithSmallerNumber } =
      setup();

    await user.type(maxInput, String(biggerNumber.value - 1));

    expect(getRowWithSmallerNumber()).toBeInTheDocument();
    expect(getRowWithBiggerNumber()).not.toBeInTheDocument();
  });
});

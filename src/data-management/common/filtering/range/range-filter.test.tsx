import { Column } from '@tanstack/react-table';
import { getByTestId, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import {
  colId,
  createWrapperRef,
  WrapperForFilterTest,
} from '../wrapper-for-filter-tests';
import { RangeFilter } from './range-filter';

const setupTest = (filterValue?: unknown) => {
  const user = userEvent.setup();
  const wrapperRef = createWrapperRef();
  const { container } = render(
    <WrapperForFilterTest
      ref={wrapperRef}
      initialFilterValue={filterValue}
    >
      {(column) => (
        <RangeFilter
          column={column as Column<unknown>}
          labelContent=''
        />
      )}
    </WrapperForFilterTest>,
  );
  const minInput = getByTestId(container, 'range-filter-min-input');
  const maxInput = getByTestId(container, 'range-filter-max-input');

  return {
    user,
    container,
    minInput,
    maxInput,
    table: wrapperRef.current?.table,
  };
};

const expectAnyFilterValue = expect.toSatisfy(
  (v) => v === null || typeof v === 'number',
);

describe('RangeFilter', () => {
  it('should render an input pre-filled with a min value from the filter value', () => {
    const initialMinValue = 10;
    const { minInput } = setupTest([initialMinValue, null]);

    expect(minInput).toHaveValue(initialMinValue);
  });

  it('should update the filter value after min value change', async () => {
    const { minInput, table, user } = setupTest();
    const newMinValue = 1;

    await user.type(minInput, String(newMinValue));

    expect(table?.getState().columnFilters).toContainEqual({
      id: colId,
      value: [newMinValue, expectAnyFilterValue],
    });
  });

  it('should render an input pre-filled with a max value from the filter value', () => {
    const initialMaxValue = 20;
    const { maxInput } = setupTest([null, initialMaxValue]);

    expect(maxInput).toHaveValue(initialMaxValue);
  });

  it('should update the filter value after max value change', async () => {
    const { maxInput, table, user } = setupTest();
    const newMaxValue = 5;

    await user.type(maxInput, String(newMaxValue));

    expect(table?.getState().columnFilters).toContainEqual({
      id: colId,
      value: [expectAnyFilterValue, newMaxValue],
    });
  });
});

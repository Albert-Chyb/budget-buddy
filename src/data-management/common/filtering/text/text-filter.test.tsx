import { Column } from '@tanstack/react-table';
import { getByTestId } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import {
  colId,
  createWrapperRef,
  WrapperForFilterTest,
} from '../wrapper-for-filter-tests';
import { TextFilter } from './text-filter';

const setup = (filterValue?: unknown) => {
  const user = userEvent.setup();
  const wrapperRef = createWrapperRef();
  const { container } = render(
    <WrapperForFilterTest
      ref={wrapperRef}
      initialFilterValue={filterValue}
    >
      {(column) => (
        <TextFilter
          column={column as Column<unknown>}
          labelContent=''
        />
      )}
    </WrapperForFilterTest>,
  );
  const input = getByTestId(container, 'text-filter-input');

  return { user, container, input, table: wrapperRef.current?.table };
};

describe('TextFilterComponent', () => {
  it('should render an input pre-filled with filter value', () => {
    const initialFilterValue = 'aaa';
    const { input } = setup(initialFilterValue);

    expect(input).toHaveValue(initialFilterValue);
  });

  it("should update the column filter value when input's value change", async () => {
    const { user, input, table } = setup();

    const newFilterValue = 'aaa';
    await user.type(input, newFilterValue);

    expect(table?.getState().columnFilters).toContainEqual({
      id: colId,
      value: newFilterValue,
    });
  });
});

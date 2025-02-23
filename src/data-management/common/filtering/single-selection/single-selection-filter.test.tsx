import { Column } from '@tanstack/react-table';
import { getByTestId, queryByTestId, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import {
  colId,
  createWrapperRef,
  WrapperForFilterTest,
} from '../wrapper-for-filter-tests';
import { SingleSelectionFilter } from './single-selection-filter';
import { SingleSelectionFilterOption } from './single-selection-filter-option';

type FilterOption = { value: string };
const optionA: FilterOption = { value: 'a' };
const optionB: FilterOption = { value: 'b' };
const filterOptions: FilterOption[] = [optionA, optionB];
const buildFilterOptionTestId = (data: FilterOption) =>
  `filter-option-${data.value}`;

const setupTest = (filterValue?: unknown) => {
  const user = userEvent.setup();
  const wrapperRef = createWrapperRef();
  const { container } = render(
    <WrapperForFilterTest
      ref={wrapperRef}
      initialFilterValue={filterValue}
    >
      {(column) => (
        <SingleSelectionFilter
          column={column as Column<unknown>}
          labelContent=''
        >
          {filterOptions.map((item, index) => (
            <SingleSelectionFilterOption
              key={item.value}
              isFirst={index === 0}
              value={item.value}
              data-testid={buildFilterOptionTestId(item)}
            />
          ))}
        </SingleSelectionFilter>
      )}
    </WrapperForFilterTest>,
  );

  const selectOption = async (option: FilterOption) => {
    await user.click(getByTestId(container, buildFilterOptionTestId(option)));
  };
  
  const getOption = (option: FilterOption) =>
    queryByTestId(container, buildFilterOptionTestId(option));

  return {
    container,
    selectOption,
    getOption,
    table: wrapperRef.current?.table,
  };
};

describe('SingleSelectionFilterComponent', () => {
  it('should update column filter state after option select', async () => {
    const { table, selectOption } = setupTest();

    await selectOption(optionB);

    expect(table?.getState().columnFilters).toContainEqual({
      id: colId,
      value: optionB.value,
    });
  });

  it('should select correct option based on filter value', () => {
    const { getOption } = setupTest(optionA.value);

    expect(getOption(optionA)).toHaveAttribute('aria-checked', 'true');
  });
});

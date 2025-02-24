import { CheckedOptions } from '@/helpers/checkboxes-group/checkboxes-group';
import { Column } from '@tanstack/react-table';
import { fireEvent, getByTestId, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  colId,
  createWrapperRef,
  WrapperForFilterTest,
} from '../wrapper-for-filter-tests';
import { CheckboxFilter, CheckboxFilterProps } from './checkbox-filter';

vi.mock('@/helpers/checkboxes-group/checkboxes-group');

interface SetupInput extends Pick<CheckboxFilterProps, 'triggerContent'> {
  filterValue?: unknown;
}
const setupTest = ({
  filterValue,
  triggerContent = '',
}: Partial<SetupInput> = {}) => {
  const wrapperRef = createWrapperRef();
  const renderResult = render(
    <WrapperForFilterTest
      ref={wrapperRef}
      initialFilterValue={filterValue}
    >
      {(column) => (
        <CheckboxFilter
          column={column as Column<unknown>}
          labelContent=''
          triggerContent={triggerContent}
        />
      )}
    </WrapperForFilterTest>,
  );

  const getTriggerBtn = () => renderResult.getByTestId('popover-trigger');

  const getCheckboxesGroup = () =>
    renderResult.getByTestId('checkboxes-group-mock');

  const openPopover = () => {
    fireEvent.click(getTriggerBtn());
  };

  const setNextCheckedOptions = (value: CheckedOptions) =>
    getCheckboxesGroup().setAttribute(
      'data-next-options',
      JSON.stringify(value),
    );

  const getCheckedOptions = (): CheckedOptions => {
    const attrValue = getCheckboxesGroup().getAttribute('data-checked-options');
    if (attrValue) return JSON.parse(attrValue);
  };

  const changeCheckedOptions = () => fireEvent.click(getCheckboxesGroup());

  return {
    table: wrapperRef.current?.table,
    container: renderResult.container,
    getTriggerBtn,
    openPopover,
    setNextCheckedOptions,
    changeCheckedOptions,
    getCheckedOptions,
  };
};

describe('CheckboxFilterComponent', () => {
  it('should display the contents of triggerContent property inside the popover trigger button', () => {
    const { getTriggerBtn, container } = setupTest({
      triggerContent: <span data-testid='trigger-content' />,
    });
    const triggerContentEl = getByTestId(container, 'trigger-content');

    expect(getTriggerBtn()).toContainElement(triggerContentEl);
  });

  it('should update the filter value when the CheckboxesGroup component changes the value', async () => {
    const { table, openPopover, setNextCheckedOptions, changeCheckedOptions } =
      setupTest();
    const newFilterValue = ['a'];

    openPopover();
    setNextCheckedOptions(newFilterValue);
    changeCheckedOptions();

    await vi.waitFor(() =>
      expect(table?.getState().columnFilters).toContainEqual({
        id: colId,
        value: newFilterValue,
      }),
    );
  });

  it('set the value of CheckboxesGroup component to the filter value', async () => {
    const initialFilterValue = ['a'];
    const { getCheckedOptions, openPopover } = setupTest({
      filterValue: initialFilterValue,
    });

    openPopover();

    expect(getCheckedOptions()).toEqual(initialFilterValue);
  });
});

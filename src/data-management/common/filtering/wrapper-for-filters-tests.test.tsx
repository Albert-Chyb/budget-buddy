import { render } from '@testing-library/react';
import { ComponentRef, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  colId,
  WrapperForFilterTest,
  WrapperForFilterTestProps,
} from './wrapper-for-filter-tests';

interface SetupInputs {
  filterValue?: unknown;
  children: WrapperForFilterTestProps['children'];
}

const setupTest = ({ filterValue, children }: Partial<SetupInputs> = {}) => {
  const wrapperRef = createRef<ComponentRef<typeof WrapperForFilterTest>>();
  const renderResult = render(
    <WrapperForFilterTest
      ref={wrapperRef}
      initialFilterValue={filterValue}
    >
      {children}
    </WrapperForFilterTest>,
  );

  return {
    table: wrapperRef.current?.table,
    ...renderResult,
  };
};

describe('WrapperForFilterTestComponent', () => {
  it('should initialize the table with a column identified by colId constant', () => {
    const { table } = setupTest();

    expect(table?.getAllColumns()).toContainEqual(
      expect.objectContaining({ id: colId }),
    );
  });

  it('should set the initial state of column filters to undefined if initialFilterValue is undefined', () => {
    const { table } = setupTest();

    expect(table?.initialState.columnFilters).toBeUndefined();
  });

  it('should initialize a column filter with the value provided in the prop', () => {
    const initialFilterValue = 'a';
    const { table } = setupTest({ filterValue: initialFilterValue });

    expect(table?.initialState.columnFilters).toContainEqual({
      id: colId,
      value: initialFilterValue,
    });
  });

  it('should render children', () => {
    const childTestId = 'child';
    const children = () => <div data-testid={childTestId} />;
    const { getByTestId } = setupTest({ children });

    expect(getByTestId(childTestId)).toBeInTheDocument();
  });

  it('should pass the column identified by colId constant to the children', () => {
    const children = vi.fn();
    setupTest({ children });

    expect(children).toBeCalledWith(expect.objectContaining({ id: colId }));
  });
});

import { getByTestId, queryByTestId, render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { BaseFilterProps, Filter } from './filter';

const setupFnFactory = () => {
  return ({
    id = '',
    labelContent = '',
    ...props
  }: Partial<BaseFilterProps> = {}) => {
    const { container } = render(
      <Filter
        id={id}
        labelContent={labelContent}
        {...props}
      />,
    );
    const labelEl = getByTestId(container, 'filter-label');

    return {
      container,
      labelEl,
    };
  };
};

describe('FilterComponent', () => {
  let setup: ReturnType<typeof setupFnFactory>;

  beforeEach(() => {
    setup = setupFnFactory();
  });

  it('should display the content of labelContent prop', () => {
    const label = 'Filter';
    const { labelEl } = setup({ labelContent: label });

    expect(labelEl).toHaveTextContent(label);
  });

  it('should set the value of label\'s "for" attribute to the id provided in the prop', () => {
    const id = 'a';
    const { labelEl } = setup({ id });

    expect(labelEl).toHaveAttribute('for', id);
  });

  it('should display children', () => {
    const childTestId = 'filter-child';
    const { container } = setup({
      children: <div data-testid={childTestId} />,
    });

    expect(queryByTestId(container, childTestId)).toBeInTheDocument();
  });
});

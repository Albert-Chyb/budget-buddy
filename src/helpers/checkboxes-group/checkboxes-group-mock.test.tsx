import { fireEvent, render } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { CheckboxesGroup } from './__mocks__/checkboxes-group';

type SetupInput = Partial<ComponentPropsWithoutRef<typeof CheckboxesGroup>>;
const setupTest = ({
  checkedOptions = undefined,
  onCheckedOptionsChange = vi.fn(),
}: SetupInput = {}) => {
  const renderResult = render(
    <CheckboxesGroup
      checkedOptions={checkedOptions}
      onCheckedOptionsChange={onCheckedOptionsChange}
    />,
  );
  const checkboxesGroup = renderResult.getByTestId('checkboxes-group-mock');

  return { checkboxesGroup };
};

describe('CheckboxesGroupMockComponent', () => {
  it('should set the value of data-checked-options attribute to the value of stringified checkedOptions property', () => {
    const checkedOptions = ['a'];
    const { checkboxesGroup } = setupTest({ checkedOptions });

    expect(checkboxesGroup).toHaveAttribute(
      'data-checked-options',
      JSON.stringify(checkedOptions),
    );
  });

  it('should call the onCheckedOptionsChange callback on click event', () => {
    const spy = vi.fn();
    const { checkboxesGroup } = setupTest({ onCheckedOptionsChange: spy });

    fireEvent.click(checkboxesGroup);

    expect(spy).toHaveBeenCalledOnce();
  });

  it('should parse the data stored in the data-next-options attribute before passing it to the onCheckedOptionsChange callback', () => {
    const checkedOptions = ['a'];
    const spy = vi.fn();
    const { checkboxesGroup } = setupTest({ onCheckedOptionsChange: spy });

    checkboxesGroup.setAttribute(
      'data-next-options',
      JSON.stringify(checkedOptions),
    );
    fireEvent.click(checkboxesGroup);

    expect(spy).toHaveBeenCalledExactlyOnceWith(checkedOptions);
  });
});

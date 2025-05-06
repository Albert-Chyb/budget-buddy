import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, Ref, useImperativeHandle, useState } from 'react';
import { describe, expect, it } from 'vitest';
import { YearPicker } from './year-picker';

const YEARS = [2023, 2024, 2025];

interface WrapperProps {
  ref: Ref<Set<number>>;
  initiallySelectedYears?: Set<number>;
}

const Wrapper = ({
  ref,
  initiallySelectedYears = new Set<number>(),
}: WrapperProps) => {
  const [value, setValue] = useState(initiallySelectedYears);

  useImperativeHandle(ref, () => value, [value]);

  return (
    <YearPicker
      years={YEARS}
      onSelectedYearsChange={setValue}
      selectedYears={value}
    />
  );
};

const setup = (initiallySelectedYears?: Set<number>) => {
  const user = userEvent.setup();
  const ref = createRef<Set<number>>();
  const renderResult = render(
    <Wrapper
      ref={ref}
      initiallySelectedYears={initiallySelectedYears}
    />,
  );

  return {
    async openPicker() {
      await user.click(renderResult.getByTestId('year-picker-trigger'));
    },
    async clickYear(year: number) {
      await user.click(renderResult.getByText(year, { exact: false }));
    },
    getSelectedValues() {
      return ref.current;
    },
    renderResult,
  };
};

describe('YearPickerComponent', () => {
  it('should select a year after it was clicked', async () => {
    const { openPicker, clickYear, getSelectedValues } = setup();
    const [year] = YEARS;

    expect(getSelectedValues()).not.toContain(year);
    await openPicker();
    await clickYear(year);

    expect(getSelectedValues()).toContain(year);
  });

  it('should deselect a year after it was clicked', async () => {
    const [selectedYear] = YEARS;
    const { openPicker, clickYear, getSelectedValues } = setup(
      new Set([selectedYear]),
    );
    expect(getSelectedValues()).toContain(selectedYear);
    await openPicker();
    await clickYear(selectedYear);

    expect(getSelectedValues()).not.toContain(selectedYear);
  });

  it('should keep the picker opened after a year is selected', async () => {
    const { openPicker, clickYear, getSelectedValues, renderResult } = setup();
    const [year] = YEARS;

    expect(getSelectedValues()).not.toContain(year);
    await openPicker();
    await clickYear(year);

    expect(
      renderResult.queryByText(year, { exact: false }),
    ).toBeInTheDocument();
  });
});

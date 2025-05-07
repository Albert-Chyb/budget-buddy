import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, Ref, useImperativeHandle, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { MonthNamePicker } from './month-name-picker';

vi.mock('@/localization', () => ({ APP_LOCALE: 'pl-PL' }));

interface WrapperProps {
  ref: Ref<Set<number>>;
  initiallySelectedMonths?: Set<number>;
}

const Wrapper = ({
  ref,
  initiallySelectedMonths = new Set<number>(),
}: WrapperProps) => {
  const [value, setValue] = useState(initiallySelectedMonths);

  useImperativeHandle(ref, () => value, [value]);

  return (
    <MonthNamePicker
      selectedMonths={value}
      onSelectedMonthsChange={setValue}
    />
  );
};

const setup = (initiallySelectedMonths?: Set<number>) => {
  const user = userEvent.setup();
  const ref = createRef<Set<number>>();
  const renderResult = render(
    <Wrapper
      ref={ref}
      initiallySelectedMonths={initiallySelectedMonths}
    />,
  );

  return {
    async openPicker() {
      await user.click(renderResult.getByTestId('month-picker-trigger'));
    },
    async selectMonth(name: string) {
      await user.click(renderResult.getByText(name, { exact: false }));
    },
    getSelectedMonths() {
      return ref.current;
    },
    renderResult,
  };
};

describe('MonthNamePickerComponent', () => {
  it('should select a month when its name is clicked', async () => {
    const { openPicker, selectMonth, getSelectedMonths } = setup();

    await openPicker();
    await selectMonth('styczeń');

    expect(getSelectedMonths()).toContain(0);
  });

  it('should deselect a month when its name is clicked', async () => {
    const { openPicker, selectMonth, getSelectedMonths } = setup(new Set([0]));

    expect(getSelectedMonths()).toContain(0);
    await openPicker();
    await selectMonth('styczeń');

    expect(getSelectedMonths()).not.toContain(0);
  });

  it('should keep the picker opened after a month is selected', async () => {
    const { openPicker, selectMonth, renderResult } = setup();
    const month = 'styczeń';

    await openPicker();
    await selectMonth(month);

    expect(
      renderResult.queryByText(month, { exact: false }),
    ).toBeInTheDocument();
  });

  it('should render all the months', async () => {
    const { openPicker, renderResult } = setup();
    const months = [
      'styczeń',
      'luty',
      'marzec',
      'kwiecień',
      'maj',
      'czerwiec',
      'lipiec',
      'sierpień',
      'wrzesień',
      'październik',
      'listopad',
      'grudzień',
    ];

    await openPicker();

    for (const month of months) {
      expect(
        renderResult.queryByText(month, { exact: false }),
      ).toBeInTheDocument();
    }
  });
});

import { DateRange } from 'react-day-picker';

export const TEST_ID = 'date-range-picker-mock';

export const fromDate = new Date(2024, 0, 1);
export const toDate = new Date(2024, 0, 2);

export const extractMockDatePickerValue = (el: HTMLElement) => {
  const value = el.getAttribute('data-value');
  if (value) {
    const { from, to } = JSON.parse(value) as Record<keyof DateRange, string>;

    return {
      from: new Date(from),
      to: new Date(to),
    } satisfies DateRange;
  }

  return '';
};

import { DateRangePickerProps } from '../date-range-picker';
import { TEST_ID, fromDate, toDate } from '../mocked-date-range-picker-utils';

export const DateRangePicker = ({
  triggerId,
  onValueChange,
  value,
}: DateRangePickerProps) => {
  return (
    <div
      data-testid={TEST_ID}
      data-triggerid={triggerId}
      data-value={JSON.stringify(value)}
      onClick={() => {
        onValueChange({
          from: fromDate,
          to: toDate,
        });
      }}
    />
  );
};

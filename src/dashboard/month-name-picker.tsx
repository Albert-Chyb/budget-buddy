import { Button } from '@/components/button';
import {
  ResponsiveMultiSelect,
  ResponsiveMultiSelectProps,
} from '@/components/responsive-multi-select';
import { capitalize } from '@/helpers/capitalize';
import { generateMonthsNames } from '@/helpers/generate-months-names';
import { APP_LOCALE } from '@/localization';
import { Calendar1 } from 'lucide-react';

const MONTHS: string[] = generateMonthsNames(APP_LOCALE).map((month) =>
  capitalize(month),
);

export type MonthNamePickerProps = Pick<
  ResponsiveMultiSelectProps<number>,
  'selection' | 'onSelectionChange' | 'isMobile'
>;

export const MonthNamePicker = (props: MonthNamePickerProps) => {
  return (
    <ResponsiveMultiSelect
      title='Wybierz miesiąc'
      description='Wybierz miesiące, dla których chcesz wyświetlić statystyki transakcji'
      options={MONTHS.map((monthName, monthIndex) => ({
        value: monthIndex,
        label: monthName,
      }))}
      {...props}
    >
      <Button>
        <Calendar1 /> Miesiąc
      </Button>
    </ResponsiveMultiSelect>
  );
};

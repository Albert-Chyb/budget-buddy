import { Button } from '@/components/button';
import {
  ResponsiveMultiSelect,
  ResponsiveMultiSelectProps,
} from '@/components/responsive-multi-select';
import { CalendarDays } from 'lucide-react';

export interface YearPickerProps
  extends Pick<
    ResponsiveMultiSelectProps<number>,
    'selection' | 'onSelectionChange'
  > {
  years: number[];
}

export const YearPicker = ({ years, ...rest }: YearPickerProps) => {
  return (
    <ResponsiveMultiSelect
      title='Wybierz rok'
      description='Wybierz lata, dla których chcesz wyświetlić statystyki transakcji'
      isMobile={true}
      options={years.map((year) => ({ value: year, label: year }))}
      {...rest}
    >
      <Button>
        <CalendarDays /> Lata
      </Button>
    </ResponsiveMultiSelect>
  );
};

import { Button } from '@/components/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import { generateMonthsNames } from '@/helpers/generate-months-names';
import { APP_LOCALE } from '@/localization';
import { Calendar1 } from 'lucide-react';

const MONTHS: string[] = generateMonthsNames(APP_LOCALE);

export type MonthNamePickerUpdater = (prev: Set<number>) => Set<number>;

interface MonthNamePickerProps {
  selectedMonths: Set<number>;
  onSelectedMonthsChange: (updater: MonthNamePickerUpdater) => void;
}

export const MonthNamePicker = ({
  selectedMonths,
  onSelectedMonthsChange,
}: MonthNamePickerProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-testid='month-picker-trigger'>
          <Calendar1 /> Miesiąc
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Wybierz miesiąc</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {MONTHS.map((month, monthIndex) => (
          <DropdownMenuCheckboxItem
            key={monthIndex}
            onSelect={($event) => $event.preventDefault()}
            checked={selectedMonths.has(monthIndex)}
            onCheckedChange={(isChecked) =>
              onSelectedMonthsChange((prev) => {
                const copy = new Set(prev);
                if (isChecked) copy.add(monthIndex);
                else copy.delete(monthIndex);

                return copy;
              })
            }
          >
            <span className='first-letter:uppercase'>{month}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

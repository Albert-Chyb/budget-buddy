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
import { useMultipleSelection } from '@/helpers/multiple-selection';
import { APP_LOCALE } from '@/localization';
import { Calendar1 } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

const MONTHS: string[] = generateMonthsNames(APP_LOCALE);

interface MonthNamePickerProps {
  selectedMonths: Set<number>;
  onSelectedMonthsChange: Dispatch<SetStateAction<Set<number>>>;
}

export const MonthNamePicker = ({
  selectedMonths,
  onSelectedMonthsChange,
}: MonthNamePickerProps) => {
  const { isChecked, handleCheckedChange } = useMultipleSelection(
    selectedMonths,
    onSelectedMonthsChange,
  );

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

        {MONTHS.map((month, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            onSelect={($event) => $event.preventDefault()}
            checked={isChecked(index)}
            onCheckedChange={(checked) => handleCheckedChange(checked, index)}
          >
            <span className='first-letter:uppercase'>{month}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

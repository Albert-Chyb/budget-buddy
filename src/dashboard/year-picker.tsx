import { Button } from '@/components/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import { useMultipleSelection } from '@/helpers/multiple-selection';
import { CalendarDays } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export interface YearPickerProps {
  years: number[];
  selectedYears: Set<number>;
  onSelectedYearsChange: Dispatch<SetStateAction<Set<number>>>;
}

export const YearPicker = ({
  years,
  selectedYears,
  onSelectedYearsChange,
}: YearPickerProps) => {
  const { isChecked, handleCheckedChange } = useMultipleSelection(
    selectedYears,
    onSelectedYearsChange,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-testid='year-picker-trigger'>
          <CalendarDays /> Lata
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Wybierz lata</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {years.map((year) => (
          <DropdownMenuCheckboxItem
            key={year}
            onCheckedChange={(isChecked) =>
              handleCheckedChange(isChecked, year)
            }
            checked={isChecked(year)}
            onSelect={($event) => $event.preventDefault()}
          >
            {year}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

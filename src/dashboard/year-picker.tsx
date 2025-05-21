import { Button } from '@/components/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import { CalendarDays } from 'lucide-react';

export type YearPickerUpdater = (prev: Set<number>) => Set<number>;

export interface YearPickerProps {
  years: number[];
  selectedYears: Set<number>;
  onSelectedYearsChange: (updater: YearPickerUpdater) => void;
}

export const YearPicker = ({
  years,
  selectedYears,
  onSelectedYearsChange,
}: YearPickerProps) => {
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
              onSelectedYearsChange((prev) => {
                const copy = new Set(prev);
                if (isChecked) copy.add(year);
                else copy.delete(year);

                return copy;
              })
            }
            checked={selectedYears.has(year)}
            onSelect={($event) => $event.preventDefault()}
          >
            {year}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

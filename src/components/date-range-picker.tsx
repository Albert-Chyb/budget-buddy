import { Button } from '@/components/button';
import { Calendar } from '@/components/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { cn } from '@/helpers/cn';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { type DateRange } from 'react-day-picker';
import { APP_LOCALE } from '@/localization.ts';

const { format } = new Intl.DateTimeFormat(APP_LOCALE, {
  dateStyle: 'medium',
});

export interface DateRangePickerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: DateRange | undefined;
  onValueChange: (value: DateRange | undefined) => void;
}

export function DateRangePicker({
  className,
  value,
  onValueChange,
  ...props
}: DateRangePickerProps) {
  return (
    <div
      className={cn('grid gap-2', className)}
      {...props}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !value && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {getPlaceholder(value)}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-auto p-0'
          align='start'
        >
          <Calendar
            autoFocus
            mode='range'
            defaultMonth={value?.from}
            selected={value}
            onSelect={onValueChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function getPlaceholder(range: DateRange | undefined) {
  if (!range) return 'Wybierz datę';

  const { from, to } = range;
  if (from && to) return `${format(from)} - ${format(to)}`;
  else if (from) return format(from);
}

import { PropsWithChildren } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover.tsx';
import { Button } from '@/components/button.tsx';

export function CheckboxFilter({ children }: PropsWithChildren) {
  return (
    <li>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline'>Kolor</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className='space-y-4'>{children}</div>
        </PopoverContent>
      </Popover>
    </li>
  );
}

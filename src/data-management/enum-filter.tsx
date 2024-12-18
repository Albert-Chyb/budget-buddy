import { ToggleGroup } from '@/components/toggle-group.tsx';
import { PropsWithChildren } from 'react';

export function EnumFilter({ children }: PropsWithChildren) {
  return (
    <li>
      <ToggleGroup
        type='single'
        variant='outline'
      >
        {children}
      </ToggleGroup>
    </li>
  );
}

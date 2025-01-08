import { ToggleGroupItem } from '@/components/toggle-group.tsx';
import { PropsWithChildren } from 'react';
import { ToggleGroupItemProps } from '@radix-ui/react-toggle-group';

export interface EnumFilterOptionProps extends PropsWithChildren {
  value: ToggleGroupItemProps['value'];
}

export function EnumFilterOption(props: EnumFilterOptionProps) {
  const { children, value } = props;
  return (
    <ToggleGroupItem
      value={value}
      className='w-full'
    >
      {children}
    </ToggleGroupItem>
  );
}

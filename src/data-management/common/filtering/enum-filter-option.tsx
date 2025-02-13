import { ToggleGroupItem } from '@/components/toggle-group.tsx';
import { PropsWithChildren } from 'react';
import { ToggleGroupItemProps } from '@radix-ui/react-toggle-group';
import { useEnumFilterContext } from '@/data-management/common/filtering/enum-filter-context.tsx';

export interface EnumFilterOptionProps extends PropsWithChildren {
  value: ToggleGroupItemProps['value'];
  isFirst: boolean;
}

export function EnumFilterOption(props: EnumFilterOptionProps) {
  const { children, value, isFirst } = props;
  const { id } = useEnumFilterContext();
  return (
    <ToggleGroupItem
      id={isFirst ? id : undefined}
      value={value}
      className='w-full'
    >
      {children}
    </ToggleGroupItem>
  );
}

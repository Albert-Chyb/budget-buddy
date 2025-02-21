import { ToggleGroupItem } from '@/components/toggle-group.tsx';
import { useEnumFilterContext } from '@/data-management/common/filtering/enum-filter-context.tsx';
import { ToggleGroupItemProps } from '@radix-ui/react-toggle-group';
import { PropsWithChildren } from 'react';

export interface EnumFilterOptionProps extends PropsWithChildren {
  value: ToggleGroupItemProps['value'];
  isFirst: boolean;
  'data-testid'?: string;
}

export function EnumFilterOption(props: EnumFilterOptionProps) {
  const { children, value, isFirst } = props;
  const { id } = useEnumFilterContext();
  return (
    <ToggleGroupItem
      id={isFirst ? id : undefined}
      value={value}
      className='w-full'
      data-testid={props['data-testid']}
    >
      {children}
    </ToggleGroupItem>
  );
}

import { ToggleGroupItem } from '@/components/toggle-group.tsx';
import { useSingleSelectionFilterContext } from '@/data-management/common/filtering/single-selection-filter-context';
import { ToggleGroupItemProps } from '@radix-ui/react-toggle-group';
import { PropsWithChildren } from 'react';

export interface SingleSelectionFilterOptionProps extends PropsWithChildren {
  value: ToggleGroupItemProps['value'];
  isFirst: boolean;
  'data-testid'?: string;
}

export function SingleSelectionFilterOption(
  props: SingleSelectionFilterOptionProps,
) {
  const { children, value, isFirst } = props;
  const { id } = useSingleSelectionFilterContext();
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

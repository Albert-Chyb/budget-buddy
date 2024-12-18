import { PropsWithChildren } from 'react';
import { CheckboxProps } from '@radix-ui/react-checkbox';
import { Label } from '@/components/label.tsx';
import { Checkbox } from '@/components/checkbox.tsx';

export interface CheckboxFilterOptionProps extends PropsWithChildren {
  value: CheckboxProps['value'];
}

export function CheckboxFilterOption(props: CheckboxFilterOptionProps) {
  const { value, children } = props;
  return (
    <Label className='flex items-center gap-x-4'>
      <Checkbox value={value} />

      {children}
    </Label>
  );
}

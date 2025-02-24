import { Checkbox } from '@/components/checkbox.tsx';
import { Label } from '@/components/label.tsx';
import { useCheckboxesGroupOption } from '@/helpers/checkboxes-group/checkboxes-group';
import { CheckboxProps, CheckedState } from '@radix-ui/react-checkbox';
import { PropsWithChildren } from 'react';

export interface CheckboxFilterOptionProps extends PropsWithChildren {
  value: CheckboxProps['value'];
}

export function CheckboxFilterOption(props: CheckboxFilterOptionProps) {
  const { value, children } = props;
  const { isChecked, check, uncheck } = useCheckboxesGroupOption(value);
  const handleCheckedChange = (state: CheckedState) => {
    if (state === 'indeterminate') return;

    if (state) check();
    else uncheck();
  };

  return (
    <Label className='flex items-center gap-x-4'>
      <Checkbox
        value={value}
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
      />

      {children}
    </Label>
  );
}

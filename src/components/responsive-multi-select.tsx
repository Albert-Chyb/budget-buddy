import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import { Key, PropsWithChildren, ReactNode } from 'react';
import { Checkbox } from './checkbox';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';
import { Label } from './label';

export type ResponsiveMultiSelectUpdater<TOptionValue> = (
  prev: Set<TOptionValue>,
) => Set<TOptionValue>;

export interface ResponsiveMultiSelectOption<TValue extends Key> {
  value: TValue;
  label: ReactNode;
}

export interface ResponsiveMultiSelectProps<TOptionValue extends Key>
  extends PropsWithChildren {
  isMobile: boolean;
  options: ResponsiveMultiSelectOption<TOptionValue>[];
  selection: Set<TOptionValue>;
  onSelectionChange: (
    updater: ResponsiveMultiSelectUpdater<TOptionValue>,
  ) => void;
  title: ReactNode;
  description: ReactNode;
}

export const ResponsiveMultiSelect = <TOptionValue extends Key>({
  isMobile,
  children,
  options,
  selection,
  onSelectionChange,
  title,
  description,
}: ResponsiveMultiSelectProps<TOptionValue>) => {
  const handleCheckedChange = (isChecked: boolean, value: TOptionValue) => {
    onSelectionChange((prev) => {
      const copy = new Set(prev);
      if (isChecked) copy.add(value);
      else copy.delete(value);

      return copy;
    });
  };

  if (isMobile)
    return (
      <Drawer autoFocus={true}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>

          {options.map((option) => (
            <Label
              key={option.value}
              className='flex items-center gap-x-2 px-2 py-4 hover:bg-accent hover:text-accent-foreground focus-within:bg-accent focus:text-accent-foreground cursor-pointer'
            >
              <Checkbox
                checked={selection.has(option.value)}
                onCheckedChange={(state) => {
                  if (state === 'indeterminate') return;

                  return handleCheckedChange(state, option.value);
                }}
              />
              <span>{option.label}</span>
            </Label>
          ))}
        </DrawerContent>
      </Drawer>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            onSelect={($event) => $event.preventDefault()}
            checked={selection.has(option.value)}
            onCheckedChange={(isChecked) =>
              handleCheckedChange(isChecked, option.value)
            }
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import {
  ComponentPropsWithoutRef,
  ComponentRef,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { Label } from '@/components/label.tsx';

export interface FilterProps
  extends PropsWithChildren<ComponentPropsWithoutRef<'li'>> {
  labelContent: ReactNode;
}

interface BaseFilterProps extends FilterProps {
  id: string;
}

export const Filter = forwardRef(
  (
    { children, labelContent, id, ...liProps }: BaseFilterProps,
    forwardedRef: ForwardedRef<ComponentRef<'li'>>,
  ) => {
    return (
      <li
        ref={forwardedRef}
        {...liProps}
      >
        <Label htmlFor={id}>{labelContent}</Label>

        <div className='mt-2'>{children}</div>
      </li>
    );
  },
);

import { Label } from '@/components/label.tsx';
import {
  ComponentPropsWithoutRef,
  ComponentRef,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  ReactNode,
} from 'react';

export interface FilterProps
  extends PropsWithChildren<ComponentPropsWithoutRef<'li'>> {
  labelContent: ReactNode;
}

export interface BaseFilterProps extends FilterProps {
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
        <Label
          htmlFor={id}
          data-testid='filter-label'
        >
          {labelContent}
        </Label>

        <div className='mt-2'>{children}</div>
      </li>
    );
  },
);

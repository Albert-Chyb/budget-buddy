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

export const Filter = forwardRef(
  (
    { children, labelContent, ...liProps }: FilterProps,
    forwardedRef: ForwardedRef<ComponentRef<'li'>>,
  ) => {
    return (
      <li
        ref={forwardedRef}
        {...liProps}
      >
        <Label>
          <span>{labelContent}</span>

          <div className='mt-2'>{children}</div>
        </Label>
      </li>
    );
  },
);

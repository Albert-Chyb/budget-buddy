import {
  ComponentPropsWithoutRef,
  ComponentRef,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
} from 'react';

export type FilterProps = PropsWithChildren<ComponentPropsWithoutRef<'li'>>;

export const Filter = forwardRef(
  (
    { children, ...liProps }: FilterProps,
    forwardedRef: ForwardedRef<ComponentRef<'li'>>,
  ) => {
    return (
      <li
        ref={forwardedRef}
        {...liProps}
      >
        {children}
      </li>
    );
  },
);

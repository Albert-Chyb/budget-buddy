import {
  ComponentPropsWithoutRef,
  ComponentRef,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
} from 'react';
import { Button } from '@/components/button.tsx';

export const RowActions = ({ children }: PropsWithChildren) => {
  return <div className='flex items-center gap-2'>{children}</div>;
};

export const RowAction = forwardRef(
  (
    props: ComponentPropsWithoutRef<typeof Button>,
    forwardedRef: ForwardedRef<ComponentRef<typeof Button>>,
  ) => (
    <Button
      ref={forwardedRef}
      size='sm'
      {...props}
    />
  ),
);

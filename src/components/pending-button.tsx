import { Button, ButtonProps } from '@/components/button.tsx';
import { LoaderCircle } from 'lucide-react';
import { ComponentRef, ForwardedRef, forwardRef } from 'react';

interface PendingButtonProps extends ButtonProps {
  isPending: boolean;
}

export const PendingButton = forwardRef(
  (
    props: PendingButtonProps,
    forwardedRef: ForwardedRef<ComponentRef<typeof Button>>,
  ) => {
    const { isPending, children, ...buttonProps } = props;

    return (
      <Button
        ref={forwardedRef}
        disabled={isPending}
        {...buttonProps}
      >
        {isPending && <LoaderCircle className='animate-spin' />}
        {children}
      </Button>
    );
  },
);

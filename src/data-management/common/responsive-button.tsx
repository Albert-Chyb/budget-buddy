import {
  ComponentPropsWithoutRef,
  ComponentRef,
  ForwardedRef,
  forwardRef,
  ReactNode,
} from 'react';
import { useIsMobile } from '@/data-management/common/is-mobile.ts';
import { Button } from '@/components/button.tsx';

export interface ResponsiveButtonProps
  extends ComponentPropsWithoutRef<typeof Button> {
  icon: ReactNode;
  label: string;
}

export const ResponsiveButton = forwardRef(
  (
    props: ResponsiveButtonProps,
    forwardedRef: ForwardedRef<ComponentRef<typeof Button>>,
  ) => {
    const { icon, label, ...btnProps } = props;
    const isMobile = useIsMobile();

    if (isMobile)
      return (
        <Button
          aria-label={label}
          ref={forwardedRef}
          size='icon'
          {...btnProps}
        >
          {icon}
        </Button>
      );

    return (
      <Button
        ref={forwardedRef}
        {...btnProps}
      >
        {label}
      </Button>
    );
  },
);

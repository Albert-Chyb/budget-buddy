import { Button } from '@/components/button.tsx';
import { useIsMobile } from '@/data-management/common/is-mobile.ts';
import {
  ComponentPropsWithoutRef,
  ComponentRef,
  ForwardedRef,
  forwardRef,
  ReactNode,
} from 'react';

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
          data-testid='responsive-button'
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
        data-testid='responsive-button'
        ref={forwardedRef}
        {...btnProps}
      >
        {label}
      </Button>
    );
  },
);

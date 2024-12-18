import { Input } from '@/components/input.tsx';
import { ComponentProps, ComponentRef, ForwardedRef, forwardRef } from 'react';

type TextFilterProps = ComponentProps<typeof Input>;

export const TextFilter = forwardRef(
  (
    props: TextFilterProps,
    forwardedRef: ForwardedRef<ComponentRef<typeof Input>>,
  ) => {
    return (
      <li>
        <Input
          type='text'
          ref={forwardedRef}
          {...props}
        />
      </li>
    );
  },
);

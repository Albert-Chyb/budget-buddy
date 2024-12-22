import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover.tsx';
import { ReactNode } from 'react';

export type EditorProps = {
  children: {
    trigger: ReactNode;
    form: ReactNode;
  };
};

export const Editor = (props: EditorProps) => {
  const { children } = props;
  const { trigger, form } = children;
  return (
    <Popover modal>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent>{form}</PopoverContent>
    </Popover>
  );
};

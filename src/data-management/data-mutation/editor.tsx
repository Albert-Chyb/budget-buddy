import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover.tsx';
import { ReactNode, useState } from 'react';

export type EditorProps = {
  isDismissible: boolean;
  children: {
    trigger: ReactNode;
    form: ReactNode;
  };
};

export const Editor = (props: EditorProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const { children, isDismissible } = props;
  const { trigger, form } = children;

  function handleOpenChange(open: boolean) {
    if (!open && !isDismissible) return;

    setIsOpened(open);
  }

  return (
    <Popover
      modal
      open={isOpened}
      onOpenChange={handleOpenChange}
    >
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent>{form}</PopoverContent>
    </Popover>
  );
};

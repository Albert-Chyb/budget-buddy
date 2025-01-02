import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover.tsx';
import { ReactNode, useEffect, useState } from 'react';
import { usePrevValueMonitor } from '@/helpers/prev-value-monitor.ts';

export type EditorProps = {
  isDismissible: boolean;
  children: {
    trigger: ReactNode;
    form: ReactNode;
  };
};

function useAutoDismissEffect(isDismissible: boolean, close: () => void) {
  const prevIsDismissible = usePrevValueMonitor(isDismissible);
  useEffect(() => {
    if (prevIsDismissible === null) return;

    if (!prevIsDismissible) close();
  }, [prevIsDismissible, close]);
}

export const Editor = (props: EditorProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const { children, isDismissible } = props;
  const { trigger, form } = children;

  useAutoDismissEffect(isDismissible, () => setIsOpened(false));

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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover.tsx';
import { ReactNode } from 'react';
import { useEditorOpenState } from '@/data-management/data-mutation/editor-open-state.tsx';

export type EditorProps = {
  isDismissible: boolean;
  children: {
    trigger: ReactNode;
    form: ReactNode;
  };
};

export const Editor = (props: EditorProps) => {
  const { children, isDismissible } = props;
  const { trigger, form } = children;
  const [isOpened, setIsOpened] = useEditorOpenState(false, isDismissible);

  return (
    <Popover
      modal
      open={isOpened}
      onOpenChange={setIsOpened}
    >
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent>{form}</PopoverContent>
    </Popover>
  );
};

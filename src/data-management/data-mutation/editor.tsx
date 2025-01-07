import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover.tsx';
import { ReactNode } from 'react';
import { useEditorOpenState } from '@/data-management/data-mutation/editor-open-state.tsx';
import { useIsMobile } from '@/data-management/is-mobile.ts';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/drawer.tsx';

export type EditorProps = {
  id: string;
  isDismissible: boolean;
  children: {
    trigger: ReactNode;
    form: ReactNode;
    title: ReactNode;
    description: ReactNode;
  };
};

export const Editor = (props: EditorProps) => {
  const { children, isDismissible, id } = props;
  const { trigger, form, title, description } = children;
  const [isOpened, setIsOpened] = useEditorOpenState(isDismissible, id);
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <Drawer
        open={isOpened}
        onOpenChange={setIsOpened}
        dismissible={isDismissible}
      >
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>

          <div className='px-[var(--global-layout-space)]'>{form}</div>
        </DrawerContent>
      </Drawer>
    );

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

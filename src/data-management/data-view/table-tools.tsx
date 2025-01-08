import { ReactNode } from 'react';
import { useIsMobile } from '@/data-management/is-mobile.ts';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/drawer.tsx';
import { Button } from '@/components/button.tsx';

interface TableToolsProps {
  filters: ReactNode;
  tableResets: ReactNode;
}

export const TableTools = (props: TableToolsProps) => {
  const { filters, tableResets } = props;
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Filtry i sortowanie</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Zarządzaj filtrowaniem oraz sortowaniem</DrawerTitle>
            <DrawerDescription>
              Dostosuj wyświetlane dane za pomocą filtrów i opcji sortowania
            </DrawerDescription>
          </DrawerHeader>

          <div className='px-[var(--global-layout-space)] flex flex-col gap-y-2'>
            <div className='ml-auto'>{tableResets}</div>
            {filters}
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Zamknij</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

  return (
    <div className='flex items-end gap-2 flex-wrap'>
      {filters}

      <div className='ml-auto'>{tableResets}</div>
    </div>
  );
};

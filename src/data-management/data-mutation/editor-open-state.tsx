import { useEffect, useState } from 'react';
import { usePrevValueMonitor } from '@/helpers/prev-value-monitor.ts';

function useAutoDismissEffect(isDismissible: boolean, close: () => void) {
  const prevIsDismissible = usePrevValueMonitor(isDismissible);
  useEffect(() => {
    if (prevIsDismissible === null) return;

    if (!prevIsDismissible) close();
  }, [prevIsDismissible, close]);
}

export function useEditorOpenState(
  initialValue: boolean = false,
  isDismissible: boolean,
) {
  const [isOpened, setIsOpened] = useState(initialValue);

  function handleOpenChange(open: boolean) {
    if (!open && !isDismissible) return;

    setIsOpened(open);
  }

  useAutoDismissEffect(isDismissible, () => handleOpenChange(false));

  return [isOpened, handleOpenChange] as const;
}

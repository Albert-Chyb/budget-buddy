import { useEffect, useState } from 'react';

export function usePrevValueMonitor(isDismissible: boolean) {
  const [prev, setPrev] = useState<boolean | null>(null);
  useEffect(() => () => setPrev(isDismissible), [isDismissible]);
  return prev;
}
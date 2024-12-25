import { useCallback, useEffect, useState } from 'react';

export const useIsMultiSort = () => {
  const [isMutiSortEnabled, setIsMultiSortEnabled] = useState(false);
  const handleKeyDown = useCallback(($event: KeyboardEvent) => {
    setIsMultiSortEnabled($event.shiftKey);
  }, []);
  const handleKeyUp = useCallback(() => {
    setIsMultiSortEnabled(false);
  }, []);

  useEffect(() => {
    addEventListener('keydown', handleKeyDown);

    return () => removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    addEventListener('keyup', handleKeyUp);

    return () => removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  return isMutiSortEnabled;
};

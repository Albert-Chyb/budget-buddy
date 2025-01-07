import { useEffect, useState } from 'react';

const mobileViewBreakpoint = matchMedia('only screen and (max-width: 1024px)');

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(mobileViewBreakpoint.matches);

  useEffect(() => {
    const listener = (query: MediaQueryListEvent) => setIsMobile(query.matches);
    mobileViewBreakpoint.addEventListener('change', listener);

    return () => mobileViewBreakpoint.removeEventListener('change', listener);
  }, []);

  return isMobile;
};

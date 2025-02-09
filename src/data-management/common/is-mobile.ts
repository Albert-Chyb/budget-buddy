import { useEffect, useState } from 'react';

const mobileViewBreakpoint = matchMedia('only screen and (max-width: 1024px)');

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(mobileViewBreakpoint.matches);

  useEffect(() => {
    const abortController = new AbortController();

    mobileViewBreakpoint.addEventListener(
      'change',
      (query) => setIsMobile(query.matches),
      {
        signal: abortController.signal,
      },
    );

    return () => abortController.abort();
  }, []);

  return isMobile;
};

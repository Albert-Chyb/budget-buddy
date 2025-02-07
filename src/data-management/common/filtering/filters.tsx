import { PropsWithChildren } from 'react';
import { useIsMobile } from '@/data-management/is-mobile.ts';

export type FiltersProps = PropsWithChildren;

export function Filters(props: FiltersProps) {
  const { children } = props;
  const isMobile = useIsMobile();

  let listStyles = 'flex gap-4';
  if (isMobile) listStyles = 'flex flex-col gap-4';

  return (
    <section>
      <h2 className='typography-large mb-2'>Filtry</h2>

      <ul
        className={listStyles}
        aria-label='Lista filtrów'
      >
        {children}
      </ul>
    </section>
  );
}

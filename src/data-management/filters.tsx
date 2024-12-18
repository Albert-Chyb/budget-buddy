import { PropsWithChildren } from 'react';

export function Filters({ children }: PropsWithChildren) {
  return (
    <section>
      <h2 className='typography-large mb-2'>Filtry</h2>

      <ul
        className='flex gap-4'
        aria-label='Lista filtrów'
      >
        {children}
      </ul>
    </section>
  );
}

import { PropsWithChildren } from 'react';

export type FiltersProps = PropsWithChildren;

export function Filters(props: FiltersProps) {
  const { children } = props;
  return (
    <section>
      <h2 className='typography-large mb-2'>Filtry</h2>

      <div className='flex gap-2 flex-wrap'>
        <ul
          className='flex gap-4'
          aria-label='Lista filtrów'
        >
          {children}
        </ul>
      </div>
    </section>
  );
}

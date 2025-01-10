import { PropsWithChildren } from 'react';

export const MobileSorting = ({ children }: PropsWithChildren) => {
  return (
    <section>
      <h2 className='typography-large mb-2'>Sortowanie</h2>
      <ul className='flex flex-wrap items-baseline gap-2'>{children}</ul>
    </section>
  );
};

import { PropsWithChildren } from 'react';

export const EmptyTableInfo = ({ children }: PropsWithChildren) => {
  return <section className='text-center'>{children}</section>;
};

export const EmptyTableInfoTitle = ({ children }: PropsWithChildren) => (
  <div className='typography-h2'>{children}</div>
);

export const EmptyTableInfoDescription = ({ children }: PropsWithChildren) => (
  <div className='typography-p'>{children}</div>
);

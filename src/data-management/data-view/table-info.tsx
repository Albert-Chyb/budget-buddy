import { PropsWithChildren } from 'react';

export const TableInfo = ({ children }: PropsWithChildren) => {
  return <section className='text-center'>{children}</section>;
};

export const TableInfoTitle = ({ children }: PropsWithChildren) => (
  <div className='typography-h2 mb-4'>{children}</div>
);

export const TableInfoDescription = ({ children }: PropsWithChildren) => (
  <div className='typography-p'>{children}</div>
);

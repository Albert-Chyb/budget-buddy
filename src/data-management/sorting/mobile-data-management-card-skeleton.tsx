import { Skeleton } from '@/components/skeleton.tsx';

export const RowHeaderSkeleton = () => <Skeleton className='h-12 w-1/3' />;

export const RowCellSkeleton = () => <Skeleton className='h-12 w-2/3' />;

export const RowSkeleton = () => (
  <div className='flex gap-2'>
    <RowHeaderSkeleton />
    <RowCellSkeleton />
  </div>
);

interface MobileTableSkeletonProps {
  colsCount: number;
}
const MobileTableSkeleton = ({ colsCount }: MobileTableSkeletonProps) => {
  const rows = [];

  for (let i = 0; i < colsCount; i++) rows.push(<RowSkeleton key={i} />);

  return <div className='space-y-2'>{rows}</div>;
};

interface MobileTablesSkeletonsProps {
  colsCount: number;
  rowsCount: number;
}
export const MobileTablesSkeletons = ({
  colsCount,
  rowsCount,
}: MobileTablesSkeletonsProps) => {
  const tables = [];

  for (let i = 0; i < rowsCount; i++) {
    tables.push(
      <MobileTableSkeleton
        key={i}
        colsCount={colsCount}
      />,
    );
  }

  return <div className='space-y-4'>{tables}</div>;
};

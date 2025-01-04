import { Skeleton } from '@/components/skeleton.tsx';

const TableHeaderSkeleton = () => <Skeleton className='h-16 mb-2' />;

const TableRowSkeleton = ({ colsCount }: { colsCount: number }) => {
  const cols = [];

  for (let i = 0; i < colsCount; i++)
    cols.push(
      <Skeleton
        key={i}
        className='h-12'
      />,
    );

  return cols;
};

export interface TableSkeletonProps {
  rowsCount: number;
  colsCount: number;
}
export const TableSkeleton = ({
  rowsCount = 5,
  colsCount = 4,
}: TableSkeletonProps) => {
  const headers = [];
  for (let i = 0; i < colsCount; i++)
    headers.push(<TableHeaderSkeleton key={i} />);

  const rows = [];
  for (let i = 0; i < rowsCount; i++)
    rows.push(
      <TableRowSkeleton
        key={i}
        colsCount={colsCount}
      />,
    );

  return (
    <div
      className='grid gap-2'
      style={{
        gridTemplateColumns: `repeat(${colsCount}, minmax(0, 1fr))`,
      }}
    >
      {headers}
      {rows}
    </div>
  );
};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card.tsx';
import {
  TableSkeleton,
  TableSkeletonProps,
} from '@/components/table-skeleton.tsx';
import { Skeleton } from '@/components/skeleton.tsx';

type DataManagementCardSkeletonProps = TableSkeletonProps;

export const DataManagementCardSkeleton = (
  props: DataManagementCardSkeletonProps,
) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className='h-8' />
        </CardTitle>
        <CardDescription>
          <Skeleton className='h-6' />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <TableSkeleton {...props} />
      </CardContent>
    </Card>
  );
};

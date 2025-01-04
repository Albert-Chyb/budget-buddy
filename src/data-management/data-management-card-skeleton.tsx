import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card.tsx';
import { TableSkeleton } from '@/components/table-skeleton.tsx';
import { Skeleton } from '@/components/skeleton.tsx';

export const DataManagementCardSkeleton = () => {
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
        <TableSkeleton
          rowsCount={5}
          colsCount={4}
        />
      </CardContent>
    </Card>
  );
};

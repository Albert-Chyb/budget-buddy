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
import { useIsMobile } from '@/data-management/is-mobile.ts';
import { MobileTablesSkeletons } from '@/data-management/sorting/mobile-data-management-card-skeleton.tsx';

type DataManagementPageSkeletonProps = TableSkeletonProps;

export const DataManagementPageSkeleton = (
  props: DataManagementPageSkeletonProps,
) => {
  const isMobile = useIsMobile();

  const titleSkeleton = <Skeleton className='h-8' />;
  const descriptionSkeleton = <Skeleton className='h-6' />;

  if (isMobile) {
    return (
      <>
        <div className='mb-4'>
          <div className='mb-2'>{titleSkeleton}</div>
          {descriptionSkeleton}
        </div>

        <MobileTablesSkeletons {...props} />
      </>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{titleSkeleton}</CardTitle>
        <CardDescription>{descriptionSkeleton}</CardDescription>
      </CardHeader>

      <CardContent>
        <TableSkeleton {...props} />
      </CardContent>
    </Card>
  );
};

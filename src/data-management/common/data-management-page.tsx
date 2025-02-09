import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card.tsx';
import { ReactNode } from 'react';
import { EditorContextProvider } from '@/data-management/common/data-mutation/editor-open-state.tsx';
import { useIsMobile } from '@/data-management/common/is-mobile.ts';
import { QueryStatus } from '@tanstack/react-query';
import { DataManagementPageSkeleton } from '@/data-management/common/data-management-page-skeleton.tsx';

interface DataManagementCardProps {
  status: QueryStatus;
  colsCount: number;
  children: {
    title: ReactNode;
    description: ReactNode;
    creator: ReactNode;
    content: ReactNode;
  };
}

export const DataManagementPage = (props: DataManagementCardProps) => {
  const { children, status, colsCount } = props;
  const isMobile = useIsMobile();
  const { title, description, content, creator } = children;

  if (status === 'pending')
    return (
      <DataManagementPageSkeleton
        rowsCount={5}
        colsCount={colsCount}
      />
    );

  if (status === 'error') return <p>Błąd w ładowaniu danych</p>;

  if (isMobile)
    return (
      <EditorContextProvider>
        <section>
          <header className='flex items-center mb-4'>
            <hgroup>
              <span className='typography-large'>{title}</span>
              <span className='typography-p'>{description}</span>
            </hgroup>

            <div className='ml-auto'>{creator}</div>
          </header>

          <div className='space-y-4'>{content}</div>
        </section>
      </EditorContextProvider>
    );

  return (
    <EditorContextProvider>
      <Card>
        <div className='flex items-center'>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>

          <div className='ml-auto mr-6'>{creator}</div>
        </div>

        <CardContent className='space-y-4'>{content}</CardContent>
      </Card>
    </EditorContextProvider>
  );
};

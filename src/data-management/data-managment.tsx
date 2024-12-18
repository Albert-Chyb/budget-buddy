import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card.tsx';
import { CategoryCreator } from '@/data-management/categories/category-creator.tsx';
import { ReactNode } from 'react';

interface DataManagementCardProps {
  children: {
    title: ReactNode;
    description: ReactNode;
    content: ReactNode;
  };
}

export const DataManagementCard = (props: DataManagementCardProps) => {
  const { children } = props;
  const { title, description, content } = children;

  return (
    <Card>
      <div className='flex items-center'>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CategoryCreator />
      </div>

      <CardContent className='space-y-4'>{content}</CardContent>
    </Card>
  );
};

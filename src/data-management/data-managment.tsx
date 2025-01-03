import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card.tsx';
import { ReactNode } from 'react';
import { EditorContextProvider } from '@/data-management/data-mutation/editor-open-state.tsx';

interface DataManagementCardProps {
  children: {
    title: ReactNode;
    description: ReactNode;
    creator: ReactNode;
    content: ReactNode;
  };
}

export const DataManagementCard = (props: DataManagementCardProps) => {
  const { children } = props;
  const { title, description, content, creator } = children;

  return (
    <EditorContextProvider>
      <Card>
        <div className='flex items-center'>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>

          {creator}
        </div>

        <CardContent className='space-y-4'>{content}</CardContent>
      </Card>
    </EditorContextProvider>
  );
};

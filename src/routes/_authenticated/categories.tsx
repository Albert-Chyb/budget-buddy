import { createFileRoute } from '@tanstack/react-router';
import { TableCell, TableRow } from '@/components/table.tsx';
import { Button } from '@/components/button.tsx';
import { Trash } from 'lucide-react';
import { TablePagination } from '@/data-management/table-pagination.tsx';
import { DataTable } from '@/data-management/data-table.tsx';
import { CategoryEditor } from '@/data-management/categories/category-editor.tsx';
import { DataManagementCard } from '@/data-management/data-managment.tsx';
import { CategoriesFilters } from '@/data-management/categories/categories-filters.tsx';

const dummyCategories = [
  { name: 'Salary', type: 'income', color: 'rgb(34, 139, 34)' },
  { name: 'Groceries', type: 'expense', color: 'rgb(255, 99, 71)' },
  { name: 'Freelance Work', type: 'income', color: 'rgb(30, 144, 255)' },
  { name: 'Electric Bill', type: 'expense', color: 'rgb(255, 165, 0)' },
  { name: 'Dining Out', type: 'expense', color: 'rgb(255, 0, 0)' },
  { name: 'Stock Dividend', type: 'income', color: 'rgb(50, 205, 50)' },
  { name: 'Gasoline', type: 'expense', color: 'rgb(220, 20, 60)' },
  { name: 'Consulting Fee', type: 'income', color: 'rgb(0, 191, 255)' },
  { name: 'Phone Bill', type: 'expense', color: 'rgb(255, 215, 0)' },
  { name: 'Rental Income', type: 'income', color: 'rgb(34, 139, 230)' },
];

const tableRows = dummyCategories.map((category, index) => {
  const { name, type, color } = category;

  return (
    <TableRow key={index}>
      <TableCell>{name}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>{color}</TableCell>
      <TableCell>
        <CategoryEditor />

        <Button variant='destructive'>
          <Trash /> Usuń
        </Button>
      </TableCell>
    </TableRow>
  );
});

export const Route = createFileRoute('/_authenticated/categories')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DataManagementCard>
      {{
        title: <h1>Kategorie</h1>,
        description: <p>Zarządzaj kategoriami transakcji</p>,
        content: (
          <>
            <CategoriesFilters
              colors={dummyCategories.map((category) => category.color)}
            />

            <DataTable>{tableRows}</DataTable>

            <TablePagination />
          </>
        ),
      }}
    </DataManagementCard>
  );
}

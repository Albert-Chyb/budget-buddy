import { Table } from '@tanstack/react-table';

export function safelyGetTableColumn(
  table: Table<unknown>,
  columnName: string,
) {
  const column = table.getColumn(columnName);
  if (!column)
    throw new Error(
      `Column with a name of ${columnName} was not fount in the table`,
    );
  return column;
}

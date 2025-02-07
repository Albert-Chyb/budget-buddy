import { Table } from '@tanstack/react-table';

/**
 * For components that needs reference to the TanStack table, but do not need to know the row data type.
 *
 * Typescript complains when a property with a type of Table<unknown> receives a table type with other generic type (for example: Table<MyRowData>).
 * The code below would give an error, despite the fact that typescript allows to assign any value to an unknown type.
 * let table: Table<unknown> = {} as Table<{ name: string }>
 *
 * One solution would be to use generics in every component that need reference to a table,
 * but this requires too much code that does not benefit anything other than making the compiler error to go away.
 *
 * Other solution would be to cast table type to Table<unknown> using 'as' keyword like so <SomeComponent table={tableRef as Table<unknown>} />.
 * This is also annoying to write and contributes only to getting rid of the error.
 *
 * We could also pass callbacks instead of table reference to other components, but this also brings too much complexity.
 * After all, the components do not have to be this reusable at this point.
 *
 * This is why I think it is a good idea to enable 'any' type in this case.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataTableProp = Table<any>;

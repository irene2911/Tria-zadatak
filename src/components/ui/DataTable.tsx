'use client';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isHistory?: boolean;
  historyStartDate?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isHistory = false,
  historyStartDate,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filtering, setFiltering] = useState('');
  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFiltering,
    state: {
      sorting,
      columnFilters,
      globalFilter: filtering,
    },
  });

  const hasGlobalFilter = columns.some((column) => column.enableGlobalFilter);

  const getCellStyle = (currentValue: string, previousValue: string) => {
    const curr = parseFloat(currentValue.replace(',', '.'));
    const prev = parseFloat(previousValue.replace(',', '.'));

    if (curr > prev) {
      return { color: 'green' };
    } else if (curr < prev) {
      return { color: 'red' };
    } else {
      return {};
    }
  };

  return (
    <>
      {hasGlobalFilter && (
        <div className='flex items-center py-4 justify-center sm:justify-start'>
          <Input
            placeholder='Search'
            value={filtering}
            onChange={(event) => setFiltering(event.target.value)}
            className='max-w-sm'
          />
        </div>
      )}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => {
                    const previousRow = table.getRowModel().rows[rowIndex + 1];
                    const currentCellValue = cell.getValue() as string;
                    const previousCellValue = previousRow
                      ? (previousRow.getValue(cell.column.id) as string)
                      : undefined;

                    return (
                      <TableCell
                        key={cell.id}
                        className=''
                        style={
                          isHistory &&
                          previousCellValue &&
                          (cell.column.id === 'kupovni_tecaj' ||
                            cell.column.id === 'prodajni_tecaj' ||
                            cell.column.id === 'srednji_tecaj')
                            ? getCellStyle(currentCellValue, previousCellValue)
                            : {}
                        }
                      >
                        {historyStartDate && cell.column.id === 'valuta' ? (
                          <Button
                            variant='ghost'
                            onClick={() => {
                              router.push(
                                `/povijest/${
                                  row.id &&
                                  (row.getValue(cell.column.id) as string)
                                }/${historyStartDate}?range=7&select=false`
                              );
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Button>
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

import { CellContext, Renderable, Row, Table } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';
import { TableCell, TableRow } from '../ui/table';
import { Button } from '../ui/button';

type flexRender<TData, TValue> = (
  Comp: Renderable<CellContext<TData, TValue>>,
  props: CellContext<TData, TValue>
) => JSX.Element | React.ReactNode;

interface TableRowComponentProps<TData, TValue> {
  row: Row<TData>;
  rowIndex: number;
  table: Table<TData>;
  isHistory: boolean;
  historyStartDate: string | undefined;
  getCellStyle: (
    currentValue: string,
    previousValue: string
  ) => string | undefined;
  flexRender: flexRender<TData, TValue>;
}

export const TableRowComponent: React.FC<TableRowComponentProps<any, any>> = ({
  row,
  rowIndex,
  table,
  isHistory,
  historyStartDate,
  getCellStyle,
  flexRender,
}) => {
  return (
    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
      {row.getVisibleCells().map((cell) => {
        const previousRow = table.getRowModel().rows[rowIndex + 1];
        const currentCellValue = cell.getValue() as string;
        const previousCellValue = previousRow
          ? (previousRow.getValue(cell.column.id) as string)
          : undefined;

        let color: string | undefined = '';
        const CELLS_TO_COLOR = [
          'kupovni_tecaj',
          'prodajni_tecaj',
          'srednji_tecaj',
        ];
        if (
          isHistory &&
          previousCellValue &&
          CELLS_TO_COLOR.includes(cell.column.id)
        ) {
          color = getCellStyle(currentCellValue, previousCellValue);
        }
        return (
          <TableCell key={cell.id} style={{ color }}>
            {historyStartDate && cell.column.id === 'valuta' ? (
              <Link
                className='hover:bg-slate-200 hover:text-accent-foreground px-2 py-2  rounded-md'
                href={`/povijest/${
                  row.id && (row.getValue(cell.column.id) as string)
                }/${historyStartDate}?range=7&select=false`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Link>
            ) : (
              flexRender(cell.column.columnDef.cell, cell.getContext())
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

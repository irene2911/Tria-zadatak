'use client';
import { ExchangeRate } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';

const createColumn = (
  accessorKey: keyof ExchangeRate,
  headerText: string,
  globalFilter: boolean,
  enableSorting: boolean
): ColumnDef<ExchangeRate> => ({
  enableGlobalFilter: globalFilter,
  enableSorting: enableSorting,
  accessorKey,
  header: ({ column }) => (
    <Button
      className={`flex flex-row gap-1 items-center px-0 ${
        enableSorting ? '' : 'cursor-default'
      }`}
      variant='ghost'
      onClick={() =>
        enableSorting && column.toggleSorting(column.getIsSorted() === 'asc')
      }
      disabled={!enableSorting}
    >
      {headerText}
      {enableSorting && (
        <span
          dangerouslySetInnerHTML={{
            __html: column.getIsSorted() === 'asc' ? '&#708;' : '&#709;',
          }}
        />
      )}
    </Button>
  ),
});

export const columns: ColumnDef<ExchangeRate>[] = [
  createColumn('drzava', 'Država', true, true),
  createColumn('drzava_iso', 'Država ISO', true, true),
  createColumn('kupovni_tecaj', 'Kupovni tečaj', false, true),
  createColumn('prodajni_tecaj', 'Prodajni tečaj', false, true),
  createColumn('srednji_tecaj', 'Srednji tečaj', false, true),
  createColumn('sifra_valute', 'Šifra valute', true, true),
  createColumn('valuta', 'Valuta', true, true),
];

export const historyColumns: ColumnDef<ExchangeRate>[] = [
  createColumn('drzava', 'Država', false, false),
  createColumn('drzava_iso', 'Država ISO', false, false),
  createColumn('kupovni_tecaj', 'Kupovni tečaj', false, false),
  createColumn('prodajni_tecaj', 'Prodajni tečaj', false, false),
  createColumn('srednji_tecaj', 'Srednji tečaj', false, false),
  createColumn('sifra_valute', 'Šifra valute', false, false),
  createColumn('valuta', 'Valuta', false, false),
  createColumn('datum_primjene', 'Datum primjene', false, false),
  createColumn('broj_tecajnice', 'Broj tečajnice', false, false),
];

import { BackButton } from '@/components/ui/BackButton';
import { CalendarInputComponent } from '../../components/ui/CalendarInputComponent';
import { DataTable } from '../../components/ui/DataTable';
import { columns } from '../../components/ui/columns';
import { formatDate } from '../../lib/utils';
import { useGetExchangeRates } from '../api/useGetExchangeRates';
import { ExchangeRateRes } from '../../lib/types';

export default async function Exchange({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const selectedDate = searchParams.date as string;
  const { data, error }: ExchangeRateRes = await useGetExchangeRates(
    selectedDate
  );

  const exchangeRateNumber = data ? data[0].broj_tecajnice : '-';
  const date = data ? data[0].datum_primjene : '';
  const formatedDate = date ? formatDate(new Date(date)) : '-';

  return (
    <div>
      <BackButton url='/' title='Trenutni tečaj' />
      <CalendarInputComponent paramDate={searchParams.date} />
      <div className='flex sm:flex-row w-full flex-col justify-between pt-6 sm:pb-3 items-center sm:items-start gap-2 pb-0 sm:gap:0'>
        <div className='flex flex-row gap-2'>
          <p>Broj tečajnice:</p>
          <p>{exchangeRateNumber}</p>
        </div>
        <div className='flex flex-row gap-2'>
          <p>Datum primjene:</p>
          <p>{formatedDate}</p>
        </div>
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          historyStartDate={selectedDate}
        />
      )}
    </div>
  );
}

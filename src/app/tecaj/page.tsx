import { BackButton } from '@/components/my-components/BackButton';
import { CalendarInputComponent } from '../../components/my-components/CalendarInputComponent';
import { DataTable } from '../../components/my-components/DataTable';
import { columns } from '../../components/ui/columns';
import { formatDate } from '../../lib/utils';
import { ExchangeRateRes } from '../../lib/types';
import { getExchangeRates } from '../api/getExchangeRates';

export default async function Exchange({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const selectedDate = searchParams.date as string;
  const { data, error }: ExchangeRateRes = await getExchangeRates(selectedDate);

  const exchangeRateNumber = data ? data[0].broj_tecajnice : '-';
  const date = data ? data[0].datum_primjene : '';
  const formatedDate = date ? formatDate(new Date(date)) : '-';

  return (
    <div>
      <BackButton url='/' title='Trenutni tečaj' />
      <CalendarInputComponent paramDate={selectedDate} />
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

import { ExchangeRateRes } from '@/lib/types';
import { BackButton } from '@/components/my-components/BackButton';
import { DataTable } from '@/components/my-components/DataTable';
import { HistoryFiltersComponent } from '@/components/my-components/HistoryFiltersComponent';
import { historyColumns } from '@/components/ui/columns';
import { formatDate, processExchangeRates } from '@/lib/utils';
import { subDays } from 'date-fns';
import { getExchangeRatesHistory } from '@/app/api/getExchangeRatesHistory';

export default async function Exchange({
  params,
  searchParams,
}: {
  params: { currency: string; date: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const canChangeDate = searchParams.select === 'true';
  const paramRange = searchParams.range as string;
  const paramRangeNumber = parseInt(paramRange);
  const paramEndDate = params.date;
  const calculateEndDate = subDays(paramEndDate, paramRangeNumber);
  const paramStartDate = formatDate(calculateEndDate);
  const { data, error }: ExchangeRateRes = await getExchangeRatesHistory(
    paramStartDate,
    paramEndDate
  );

  const filteredData = processExchangeRates(data, params.currency);

  if (filteredData && filteredData.length === 0)
    return <p>No data available for the selected currency and date.</p>;

  return (
    <div className='space-y-10'>
      {canChangeDate ? (
        <BackButton url='/' title='Povijest tečaja' />
      ) : (
        <BackButton
          url={`/tecaj?date=${params.date}`}
          title='Povijest tečaja'
        />
      )}

      <HistoryFiltersComponent
        paramRange={paramRange}
        paramEndDate={paramEndDate}
        canChangeDate={canChangeDate}
      />
      {error ? (
        <p>{error}</p>
      ) : (
        <DataTable
          columns={historyColumns}
          data={filteredData ?? []}
          isHistory={true}
        />
      )}
    </div>
  );
}

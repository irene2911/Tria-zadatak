import { today } from '@/lib/constants';
import { isWithinInterval } from 'date-fns';
import { ExchangeRateRes } from '../../lib/types';

export const useGetExchangeRatesHistory = async (
  startDate: string,
  endDate: string
) => {
  let error = null;
  let data = null;
  const endDateToCheck = new Date(endDate);
  const lowerBoundDate = new Date(2023, 0, 1);

  if (
    !isWithinInterval(endDateToCheck, {
      start: lowerBoundDate,
      end: today,
    })
  ) {
    error = `Please select an end date that is between 2023-01-01 and today.`;
    return { error } as ExchangeRateRes;
  }

  try {
    const res = await fetch(
      `${process.env.BASE_HNB_API_URL}?datum-primjene-od=${startDate}&datum-primjene-do=${endDate}`,
      {
        method: 'GET',
      }
    );

    data = await res.json();
  } catch (err) {
    error =
      'An error occurred while fetching exchange rates. Please try again later.';
    console.log('useGetExchangeRatesHistory', err);
  }

  return { data, error } as ExchangeRateRes;
};

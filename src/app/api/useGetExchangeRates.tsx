import { today } from '@/lib/constants';
import { isWithinInterval } from 'date-fns';
import { ExchangeRateRes } from '../../lib/types';

export const useGetExchangeRates = async (date: string) => {
  let error = null;
  let data = null;

  if (
    !isWithinInterval(new Date(date), {
      start: new Date(2023, 0, 1),
      end: new Date(today),
    })
  ) {
    error = `Please select a date that is between 2023-01-01 and ${today}.`;
    return { error } as ExchangeRateRes;
  }

  try {
    const res = await fetch(
      `${process.env.BASE_HNB_API_URL}?datum-primjene=${date}`,
      {
        method: 'GET',
      }
    );
    data = await res.json();
  } catch (err) {
    error =
      'An error occurred while fetching exchange rates. Please try again later.';
    console.log('useGetExchangeRates', err);
  }
  return { data, error } as ExchangeRateRes;
};

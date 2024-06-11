import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { ExchangeRate } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const processExchangeRates = (
  data: ExchangeRate[],
  currency: string
): ExchangeRate[] | undefined => {
  if (!data) return;
  const filteredData = data.filter((rate) => rate.valuta === currency);

  filteredData.sort(
    (a, b) =>
      new Date(b.datum_primjene).getTime() -
      new Date(a.datum_primjene).getTime()
  );

  const uniqueData = filteredData.reduce((acc: ExchangeRate[], current) => {
    const existing = acc.find(
      (item) => item.broj_tecajnice === current.broj_tecajnice
    );
    if (
      !existing ||
      new Date(existing.datum_primjene) > new Date(current.datum_primjene)
    ) {
      return acc
        .filter((item) => item.broj_tecajnice !== current.broj_tecajnice)
        .concat([current]);
    }
    return acc;
  }, []);

  return uniqueData;
};

export const formatDate = (date: Date) => {
  return format(date, 'yyyy-MM-dd');
};

export const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

'use client';
import { Button } from '@/components/ui/button';
import { apiCutoff, today } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import { isLeapYear, isValid, isWithinInterval, parse } from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';
import { DateInput } from './DateInput';

export const CalendarInputComponent: FC<{ paramDate: string }> = ({
  paramDate,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [date, setDate] = useState<Date>(new Date(paramDate));
  const [inputValue, setInputValue] = useState(paramDate);
  const [error, setError] = useState<string | null>(null);

  const selected = formatDate(date);
  const isToday = selected === today;
  const isApiCutoff = selected === apiCutoff;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  };

  const handleOnBurl = () => {
    const lastDateSelected = formatDate(date).toString();
    setInputValue(lastDateSelected);
    setError(null);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }
    setError(null);

    const inputValue = event.currentTarget.value;
    const [year, month, day] = inputValue.split('-').map(Number);
    const parsedDate = parse(inputValue, 'yyyy-MM-dd', new Date());

    if (month === 2 && day === 29 && !isLeapYear(new Date(year, month, day))) {
      setError('Invalid date. The year is not a leap year.');
      return;
    }

    if (!isValid(parsedDate)) {
      setError('Invalid date format. Please use the format YYYY-MM-DD.');
      return;
    }

    if (
      !isWithinInterval(new Date(parsedDate), {
        start: new Date(2023, 0, 1),
        end: new Date(today),
      })
    ) {
      setError(`Please select a date that is between 2023-01-01 and ${today}.`);
      return;
    }

    if (!isNaN(parsedDate.getTime())) {
      setDate(parsedDate);
      const newDate = formatDate(parsedDate);
      params.set('date', newDate);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleButtonDateChange = (direction: 'prev' | 'next') => {
    if (!date) return;

    let newDate;
    if (direction === 'prev') {
      newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - 1
      );
    } else {
      newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );
    }

    const formattedNewDate = formatDate(newDate);
    setDate(newDate);
    setInputValue(formattedNewDate);
    params.set('date', formattedNewDate);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='w-full flex flex-col items-center sm:items-start mt-10'>
      <div className='gap-5 flex flex-row items-center'>
        <Button
          asChild
          size='sm'
          onClick={() => {
            handleButtonDateChange('prev');
            if (error) setError(null);
          }}
          variant={'outline'}
          className={`${isApiCutoff && 'pointer-events-none opacity-50'}`}
        >
          <p>Prev</p>
        </Button>
        <DateInput
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleInputKeyDown={handleInputKeyDown}
          handleOnBurl={handleOnBurl}
        />
        <Button
          asChild
          size='sm'
          onClick={() => {
            if (isToday) return;
            handleButtonDateChange('next');
            if (error) setError(null);
          }}
          variant={'outline'}
          className={`${isToday && 'pointer-events-none opacity-50'}`}
        >
          <p>Next</p>
        </Button>
      </div>
      <p className='text-red-500 text-sm text-center mt-1'>{error ?? ''}</p>
    </div>
  );
};

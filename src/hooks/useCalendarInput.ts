'use client';
import { apiCutoff, today } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import {
  addDays,
  isLeapYear,
  isValid,
  isWithinInterval,
  parse,
  subDays,
} from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const useCalendarInput = (paramDate: string) => {
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

  const handleOnBlur = () => {
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
      newDate = subDays(date, 1);
    } else {
      newDate = addDays(date, 1);
    }

    const formattedNewDate = formatDate(newDate);
    setDate(newDate);
    setInputValue(formattedNewDate);
    params.set('date', formattedNewDate);
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    date,
    inputValue,
    error,
    isToday,
    isApiCutoff,
    setError,
    handleInputChange,
    handleOnBlur,
    handleInputKeyDown,
    handleButtonDateChange,
  };
};

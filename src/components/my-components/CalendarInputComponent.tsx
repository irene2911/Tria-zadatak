'use client';
import { Button } from '@/components/ui/button';
import { useCalendarInput } from '@/hooks/useCalendarInput';
import { FC } from 'react';
import { DateInput } from './DateInput';

export const CalendarInputComponent: FC<{ paramDate: string }> = ({
  paramDate,
}) => {
  const {
    inputValue,
    error,
    isToday,
    isApiCutoff,
    setError,
    handleInputChange,
    handleOnBlur,
    handleInputKeyDown,
    handleButtonDateChange,
  } = useCalendarInput(paramDate);

  return (
    <div className='w-full flex flex-col items-center sm:items-start mt-10'>
      <div className='gap-5 flex flex-row items-center'>
        <Button
          size='sm'
          onClick={() => {
            handleButtonDateChange('prev');
            if (error) setError(null);
          }}
          variant={'outline'}
          className={`${isApiCutoff && 'pointer-events-none opacity-50'}`}
        >
          Prev
        </Button>
        <DateInput
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleInputKeyDown={handleInputKeyDown}
          handleOnBlur={handleOnBlur}
        />
        <Button
          size='sm'
          onClick={() => {
            if (isToday) return;
            handleButtonDateChange('next');
            if (error) setError(null);
          }}
          variant={'outline'}
          disabled={isToday}
        >
          Next
        </Button>
      </div>
      <p
        data-testId='input-error-message'
        className='text-red-500 h-1 text-sm text-center mt-1'
      >
        {error ?? ''}
      </p>
    </div>
  );
};

'use client';
import { cn } from '@/lib/utils';
import { FC } from 'react';

interface DateInputProps {
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleOnBlur: () => void;
}
export const DateInput: FC<DateInputProps> = ({
  handleInputChange,
  handleInputKeyDown,
  inputValue,
  handleOnBlur,
}) => {
  return (
    <input
      data-testid='date-input'
      className={cn(
        'sm:max-w-[240px] max-w-[150px]  pl-3 text-left font-normal focus-visible:outline-none border border-input  shadow-sm hover:text-accent-foreground rounded-md text-sm h-9 px-4 py-2'
      )}
      placeholder={'YYYY-MM-DD'}
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleInputKeyDown}
      onBlur={() => {
        if (inputValue === '') {
          handleOnBlur();
        }
      }}
    />
  );
};

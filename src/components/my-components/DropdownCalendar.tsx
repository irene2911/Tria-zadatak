'use client';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FC } from 'react';

export const DropdownCalendar: FC<{
  onDateSelect: (selectedDate: Date) => void;
  endDate: Date;
  canChangeDate: boolean;
}> = ({ endDate, onDateSelect, canChangeDate }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'sm:w-[240px] w-full pl-3 text-left font-normal',
            !endDate && 'text-muted-foreground'
          )}
          disabled={!canChangeDate}
          data-testId='dropdown-calendar'
        >
          {endDate ? formatDate(endDate) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={endDate}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              onDateSelect(selectedDate);
            }
          }}
          className='rounded-md border'
          toDate={new Date()}
          fromDate={new Date('2023-01-01')}
          weekStartsOn={1}
          disabled={!canChangeDate}
          defaultMonth={endDate}
        />
      </PopoverContent>
    </Popover>
  );
};

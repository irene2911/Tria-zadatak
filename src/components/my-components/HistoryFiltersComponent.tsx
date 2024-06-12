'use client';
import { formatDate } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { Dropdown } from './Dropdown';
import { DropdownCalendar } from './DropdownCalendar';

export const HistoryFiltersComponent: FC<{
  paramRange: string;
  paramEndDate: string;
  canChangeDate: boolean;
}> = ({ paramRange, paramEndDate, canChangeDate }) => {
  const router = useRouter();
  const [endDate, setEndDate] = useState(new Date(paramEndDate));
  const [range, setRange] = useState(Number(paramRange));

  const updateUrl = (selectedDate: Date, newPosition: number) => {
    const formattedEndDate = formatDate(selectedDate);

    const url = canChangeDate
      ? `/povijest/USD/${formattedEndDate}?range=${newPosition}&select=true`
      : `/povijest/USD/${formattedEndDate}?range=${newPosition}&select=false`;
    router.push(url);
  };

  const handleDateSelect = (selectedDate: Date) => {
    setEndDate(selectedDate);
    updateUrl(selectedDate, range);
  };

  const handlePositionChange = (newPosition: number) => {
    setRange(newPosition);
    updateUrl(endDate, newPosition);
  };

  return (
    <div className='flex sm:flex-row gap-3 sm:gap-5 flex-col'>
      <Dropdown position={range} onPositionChange={handlePositionChange} />
      <DropdownCalendar
        endDate={endDate}
        onDateSelect={handleDateSelect}
        canChangeDate={canChangeDate}
      />
    </div>
  );
};

'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu';
import { FC } from 'react';

export const Dropdown: FC<{
  position: number;
  onPositionChange: (newPosition: number) => void;
}> = ({ position, onPositionChange }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Raspon dana pretrage</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-44 text-center h-60 overflow-y-auto'>
        <DropdownMenuLabel>
          <span className='text-muted-foreground'>
            Odabrani raspon: {position}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position.toString()}
          onValueChange={(newPosition) => {
            onPositionChange(Number(newPosition));
          }}
        >
          {Array.from({ length: 59 }, (_, i) => i + 2).map((number) => (
            <DropdownMenuRadioItem key={number} value={number.toString()}>
              {number} dana
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

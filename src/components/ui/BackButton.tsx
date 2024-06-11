'use client';
import { useRouter } from 'next/navigation';
import { Button } from './button';
import { FC } from 'react';
export const BackButton: FC<{ url: string; title: string }> = ({
  url,
  title,
}) => {
  const router = useRouter();
  return (
    <div className='flex items-center gap-5'>
      <Button variant='outline' onClick={() => router.push(url)}>
        {'<'} Back
      </Button>
      <h1 className='uppercase'>{title}</h1>
    </div>
  );
};

'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { FC } from 'react';
import Link from 'next/link';
export const BackButton: FC<{ url: string; title: string }> = ({
  url,
  title,
}) => {
  const router = useRouter();
  return (
    <div className='flex items-center gap-5'>
      <Link href={url}>
        <Button variant='outline'>{'<'} Back</Button>
      </Link>
      <h1 className='uppercase'>{title}</h1>
    </div>
  );
};

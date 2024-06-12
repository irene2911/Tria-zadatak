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
      <Link
        href={url}
        className='border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 inline-flex items-center justify-center rounded-md'
      >
        {'<'} Back
      </Link>
      <h1 className='uppercase'>{title}</h1>
    </div>
  );
};

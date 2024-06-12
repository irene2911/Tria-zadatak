'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatDate } from '../lib/utils';

export default function Home() {
  const defaultDate = formatDate(new Date());

  return (
    <main className='w-full min-h-screen mx-auto flex items-center justify-center flex-col gap-10'>
      <h1>HNB tečajne liste </h1>
      <div className='flex items-center justify-center md:gap-20 sm:gap-10 gap-5 flex-col sm:flex-row'>
        <Link href={`/tecaj?date=${defaultDate}`}>
          <Button className='px-6' variant='secondary' type='button'>
            Trenutna Tečajna lista
          </Button>
        </Link>
        <Link href={`/povijest/USD/${defaultDate}?range=7&select=true`}>
          <Button className='px-6' variant='secondary' type='button'>
            Povijest Tečajnih lista
          </Button>
        </Link>
      </div>
    </main>
  );
}

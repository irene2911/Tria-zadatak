'use client';
import Link from 'next/link';
import { formatDate } from '../lib/utils';

export default function Home() {
  const defaultDate = formatDate(new Date());

  return (
    <main className='w-full min-h-screen mx-auto flex items-center justify-center flex-col gap-10'>
      <h1>HNB tečajne liste </h1>
      <div className='flex items-center justify-center md:gap-20 sm:gap-10 gap-5 flex-col sm:flex-row'>
        <Link
          href={`/tecaj?date=${defaultDate}`}
          className='bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 px-6 h-9 py-2 rounded-md'
        >
          Trenutna Tečajna lista
        </Link>
        <Link
          href={`/povijest/USD/${defaultDate}?range=7&select=true`}
          className='bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 px-6 h-9 py-2 rounded-md'
        >
          Povijest Tečajnih lista
        </Link>
      </div>
    </main>
  );
}

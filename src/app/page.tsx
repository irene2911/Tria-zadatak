'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { formatDate } from '../lib/utils';

export default function Home() {
  const router = useRouter();
  const defaultDate = formatDate(new Date());

  return (
    <main className='w-full min-h-screen mx-auto flex items-center justify-center flex-col gap-10'>
      <h1>HNB tečajne liste </h1>
      <div className='flex items-center justify-center md:gap-20 sm:gap-10 gap-5 flex-col sm:flex-row'>
        <Button
          className='px-6'
          variant='secondary'
          type='button'
          onClick={() => router.push(`/tecaj?date=${defaultDate}`)}
        >
          Trenutna Tečajna lista
        </Button>
        <Button
          className='px-6'
          variant='secondary'
          type='button'
          onClick={() =>
            router.push(`/povijest/USD/${defaultDate}?range=7&select=true`)
          }
        >
          Povijest Tečajnih lista
        </Button>
      </div>
    </main>
  );
}

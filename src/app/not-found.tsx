'use client';

export default function ErrorBoundary() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='text-center'>
        <h1 className='xl:text-3xl text-2xl font-bold text-black mb-5'>
          <span className='font-extrabold xl:text-4xl text-3xl text-black'>
            404
          </span>
          : Aw, Snap!
        </h1>
        <h3 className='xl:text-3xl text-2xl font-medium text-black '>
          We can&apos;t find the page. Check the URL or head back home.
        </h3>
      </div>
    </div>
  );
}

'use client';

import Counter from '@/components/Counter';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <Counter initial={0} />
    </main>
  );
}

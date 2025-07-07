import Counter from '@/components/Counter';

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">Welcome to the Kanban Board</h1>
      <Counter initial={0} />
    </main>
  );
}

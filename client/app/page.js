import Cards from '@/sections/Cards';
import Charts from '@/sections/Charts';

export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <Cards/>
      <Charts/>
    </main>
  );
}

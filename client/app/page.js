import Cards from '@/sections/Cards';
import Charts from '@/sections/Charts';
import Tables from '@/sections/Tables';
export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <Cards/>
      <Charts/>
      <Tables/>
    </main>
  );
}

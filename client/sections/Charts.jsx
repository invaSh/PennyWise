import React from 'react';
import ExpensesChart from '@/components/dashboard/ExpensesChart';
import SavingsChart from '@/components/dashboard/SavingsChart';

function Charts() {
  return (
    <section className="flex justify-center gap-4" >
      <div className="bg-black p-3 rounded" style={{ backgroundColor: "rgba(24, 23, 23, 0.91)" }}>
        <ExpensesChart />
      </div>
      <div className="bg-black p-3 rounded" style={{ backgroundColor: "rgba(24, 23, 23, 0.91)" }}>
        <SavingsChart />
      </div>
    </section>
  );
}

export default Charts;

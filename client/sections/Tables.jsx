import React from 'react';
import ExpensesTable from '@/components/dashboard/ExpensesTable';
import GoalsTable from '@/components/dashboard/GoalsTable';
function Tables() {
  return (
    <div className="flex justify-center gap-5">
        <ExpensesTable />
    </div>
  );
}

export default Tables;

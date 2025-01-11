import React from 'react';
import { getWeeklyExpenses } from '@/app/actions/expenseActions';

const ExpensesTable = async () => {
  const expenses = await getWeeklyExpenses();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long', // "Monday"
      year: 'numeric', // "2025"
      month: 'long', // "January"
      day: 'numeric', // "11"
    });
  };
  return (
    <div className="h-[500px] overflow-auto rounded-lg bg-black p-6 shadow-xl flex-1 flex flex-col">
      <h4 className="mb-6 text-2xl font-semibold text-yellow-300 text-center">
        Expense Breakdown
      </h4>

      {expenses.error ? (
        <p className="text-center text-yellow-300 py-6">
          No expenses available.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto text-left">
            <thead>
              <tr className="bg-black text-yellow-300 border-b-2 border-yellow-300">
                <th className="p-4 text-sm font-medium uppercase tracking-wider text-center">
                </th>
                <th className="p-4 text-sm font-medium uppercase tracking-wider text-center">
                  Amount
                </th>
                <th className="p-4 text-sm font-medium uppercase tracking-wider text-center">
                  Category
                </th>
                <th className="p-4 text-sm font-medium uppercase tracking-wider text-center hidden sm:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-yellow-300">
                    No expenses to display.
                  </td>
                </tr>
              ) : (
                expenses.map((expense, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? '' : 'bg-yellow-300/10'}`}
                  >
                    <td className="p-4 text-yellow-300 text-center">
                      #{index+1}
                    </td>
                    <td className="p-4 text-yellow-300 text-center">
                      €{expense.amount.toFixed(2)}
                    </td>
                    <td className="p-4 text-yellow-300 text-center">
                      {expense.category}
                    </td>
                    <td className="p-4 text-yellow-300 text-center hidden sm:table-cell">
                      {formatDate(expense.date)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpensesTable;

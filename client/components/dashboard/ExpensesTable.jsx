import React from 'react';
import { getExpenses } from '@/app/actions/expenseActions';

const ExpensesTable = async () => {
  const expenses = await getExpenses();

  return (
    <div className="rounded-sm bg-black px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-yellow-300">
        Expense Breakdown
      </h4>

      {expenses.error ? (
        <p className="text-center text-gray-400 py-6">No expenses available.</p>
      ) : (
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-yellow-300 sm:grid-cols-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase text-black xsm:text-base">
                ID
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase text-black xsm:text-base">
                AMOUNT
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase text-black xsm:text-base">
                CATEGORY
              </h5>
            </div>
            <div className="p-2.5 text-center hidden sm:block xl:p-5">
              {' '}
              {/* Made visible on small screens */}
              <h5 className="text-sm font-medium uppercase text-black xsm:text-base">
                DATE
              </h5>
            </div>
          </div>

          {expenses.length !== 0 && (
            <>
              {expenses.map((expense, key) => (
                <div
                  className={`grid grid-cols-3 sm:grid-cols-4 ${
                    key === expenses.length - 1
                      ? ''
                      : 'border-b border-yellow-300'
                  }`}
                  key={key}
                >
                  <div className="flex items-center gap-3 p-2.5 xl:p-5">
                    <p className="text-yellow-300">{expense.id}</p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-yellow-300">${expense.amount}</p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-yellow-300">{expense.category}</p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-yellow-300">{expense.date}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpensesTable;

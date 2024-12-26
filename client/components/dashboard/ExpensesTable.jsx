import React from 'react';

const expenseData = [
  {
    category: 'Marketing',
    budget: '10,000',
    spent: '8,500',
    remaining: '1,500',
    percentage: 85,
  },
  {
    category: 'Development',
    budget: '20,000',
    spent: '15,000',
    remaining: '5,000',
    percentage: 75,
  },
  {
    category: 'Operations',
    budget: '12,000',
    spent: '10,000',
    remaining: '2,000',
    percentage: 83,
  },
  {
    category: 'Human Resources',
    budget: '8,000',
    spent: '6,000',
    remaining: '2,000',
    percentage: 75,
  },
  {
    category: 'Miscellaneous',
    budget: '5,000',
    spent: '3,500',
    remaining: '1,500',
    percentage: 70,
  },
];

const ExpensesTable = () => {
  return (
    <div className="rounded-sm bg-black px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-yellow-300">
        Expense Breakdown
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-yellow-300 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase text-black xsm:text-base">
              Category
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase text-black xsm:text-base">
              Budget
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase text-black xsm:text-base">
              Spent
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase text-black xsm:text-base">
              Remaining
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase text-black xsm:text-base">
              % Spent
            </h5>
          </div>
        </div>

        {expenseData.map((expense, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === expenseData.length - 1 ? '' : 'border-b border-yellow-300'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-yellow-300">{expense.category}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-yellow-300">${expense.budget}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-yellow-300">${expense.spent}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-yellow-300">${expense.remaining}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-yellow-300">{expense.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensesTable;

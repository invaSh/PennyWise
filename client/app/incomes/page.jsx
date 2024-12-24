'use client';

import React, { useState, useEffect } from 'react';
import { getIncomes } from '../actions/incomeActions';
import { MoreVertical, Trash2, FilePenLine } from 'lucide-react';

function List() {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const getIncome = async () => {
      const data = await getIncomes();
      setIncomes(data);
    };
    getIncome();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="p-6 min-h-screen flex justify-center">
      <div className="w-full max-w-screen-lg">
        <h1 className="text-2xl font-bold text-yellow-300 mb-4">
          Income List
        </h1>
        <div>
          {incomes.length === 0 ? (
            <p className="text-center text-gray-400 py-6">
              No incomes available.
            </p>
          ) : (
            <ul className="divide-y divide-gray-600 grid grid-cols-1 md:grid-cols-2 md:gap-4">
              {incomes.map((income, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center px-4 py-3 bg-gray-700 shadow-md rounded-lg overflow-hidden"
                >
                  <div>
                    <p className="text-yellow-300 font-medium">
                      {income.source}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {formatDate(income.dateReceived)}
                    </p>
                  </div>
                  <p className="text-yellow-300 font-bold">${income.amount}</p>
                  <div className="flex gap-1 text-yellow-300 font-bold">
                    <FilePenLine className="hover:text-slate-100 cursor-pointer transition-all"/>
                    |
                    <Trash2 className="hover:text-slate-100 cursor-pointer transition-all"/>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;

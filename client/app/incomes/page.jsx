'use client';

import React, { useState, useEffect } from 'react';
import { getIncomes } from '../actions/incomeActions';
import { FilePenLine } from 'lucide-react';
import IncomeModal from '@/components/IncomeModal';

function List() {
  const [incomes, setIncomes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);
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
  const handleEditClick = (income) => {
    setSelectedIncome(income);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIncome(null);
  };
  console.log(incomes);

  return (
    <div className="p-6 min-h-screen flex justify-center">
      <div className="w-full max-w-screen-lg">
        <h1 className="text-2xl font-bold text-yellow-300 mb-4 text-center">
          Income List
        </h1>
        <div>
          {incomes.error ? (
            <p className="text-center text-gray-400 py-6">
              No incomes available.
            </p>
          ) : (
            <>
              <ul className="divide-y divide-gray-600 grid grid-cols-1 md:grid-cols-2 md:gap-4">
                {incomes.map((income, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center px-4 py-3 bg-gray-700 shadow-md rounded-lg overflow-hidden"
                  >
                    <div className="flex flex-col">
                      <p className="text-yellow-300 font-medium">
                        {income.source}
                      </p>
                      <div className="flex items-center text-gray-400 text-sm">
                        <span>{income.type}</span>
                        <span className="mx-2">|</span>
                        <span>{formatDate(income.dateReceived)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-yellow-300">
                      <p className=" font-bold">${income.amount}</p>
                      <FilePenLine
                        className="hover:text-slate-100 cursor-pointer transition-all"
                        onClick={() => handleEditClick(income)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              {isModalOpen && (
                <IncomeModal income={selectedIncome} closeModal={closeModal} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;

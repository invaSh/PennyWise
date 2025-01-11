'use client';
import React, { useState, useEffect } from 'react';
import { getExpenses } from '../actions/expenseActions';
import ExpenseModal from '@/components/ExpenseModal';
import { FilePenLine } from 'lucide-react';
function List() {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    const getExp = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (e) {
        console.error(e);
      }
    };
    getExp();
  }, []);

  const handleEditClick = (ex) => {
    setExpense(ex);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setExpense(null);
  };
  return (
    <div className="px-8x">
      <h1 className="text-5xl text-center my-8 text-yellow-300 font-tektur animate__animated animate__fadeInUp">
        Expenses
      </h1>
      {expenses.error ? (
        <p className="text-center text-gray-400 py-6">No expenses available.</p>
      ) : (
        <div className="overflow-x-auto bg-black p-6 rounded-2xl shadow-2xl backdrop-blur-sm animate__animated animate__fadeInUp">
          <table className="min-w-full table-auto rounded-xl border-collapse text-center">
            <thead>
              <tr>
                <th className="p-4 border-b border-yellow-300 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold text-sm uppercase tracking-wider rounded-tl-xl">
                  ID
                </th>
                <th className="p-4 border-b border-yellow-300 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold text-sm uppercase tracking-wider">
                  Amount
                </th>
                <th className="p-4 border-b border-yellow-300 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold text-sm uppercase tracking-wider">
                  Category
                </th>
                <th className="p-4 border-b border-yellow-300 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold text-sm uppercase tracking-wider">
                  Date
                </th>
                <th className="p-4 border-b border-yellow-300 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold text-sm uppercase tracking-wider w-[250px]">
                  Description
                </th>
                <th className="p-4 border-b border-yellow-300 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold text-sm uppercase tracking-wider rounded-tr-xl">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="odd:bg-black even:bg-gradient-to-r from-yellow-700 to-yellow-900 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300"
                >
                  <td className="p-4 border-b border-yellow-300 bg-black text-yellow-100 font-semibold">
                    #{expense.id}
                  </td>
                  <td className="p-4 border-b border-yellow-300 bg-black text-yellow-100 font-semibold">
                    €{expense.amount}
                  </td>
                  <td className="p-4 border-b border-yellow-300 bg-black text-yellow-300">
                    {expense.category}
                  </td>
                  <td className="p-4 border-b border-yellow-300 bg-black text-yellow-300">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 border-b border-yellow-300 bg-black text-yellow-300">
                    {expense.description}
                  </td>
                  <td className="p-4 border-b border-yellow-300 bg-black text-yellow-300">
                    <div className="flex gap-x-3 justify-center">
                      <FilePenLine
                        className="hover:text-slate-100 cursor-pointer transition-all"
                        onClick={() => handleEditClick(expense)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <ExpenseModal expense={expense} closeModal={closeModal} />
      )}
    </div>
  );
}

export default List;

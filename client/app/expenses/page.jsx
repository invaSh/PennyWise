import React from "react";
import { getExpenses } from "../actions/expenseActions";

async function List() {
    const startTime = Date.now(); // Record the start time
    const expenses = await getExpenses();
    const endTime = Date.now(); // Record the end time
  
    console.log("Data fetch time:", endTime - startTime, "ms"); 

  return (
    <div className="px-8">
      <h1 className="text-5xl text-center my-8 text-yellow-300 font-tektur animate__animated animate__fadeInUp">Expenses</h1>
      <div className="overflow-x-auto bg-black p-6 rounded-2xl shadow-2xl backdrop-blur-sm animate__animated animate__fadeInUp">
        <table className="min-w-full text-left table-auto rounded-xl border-collapse">
          <thead>
            <tr>
              <th className="p-4 border-b border-yellow-300 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold text-sm uppercase tracking-wider rounded-tl-xl">
                Amount
              </th>
              <th className="p-4 border-b border-yellow-300 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold text-sm uppercase tracking-wider">
                Category
              </th>
              <th className="p-4 border-b border-yellow-300 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold text-sm uppercase tracking-wider">
                Date
              </th>
              <th className="p-4 border-b border-yellow-300 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold text-sm uppercase tracking-wider">
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
                  ${expense.amount}
                </td>
                <td className="p-4 border-b border-yellow-300 bg-black text-yellow-300">
                  {expense.category}
                </td>
                <td className="p-4 border-b border-yellow-300 bg-black text-yellow-300">
                  {new Date(expense.date).toLocaleDateString()}{" "}
                </td>
                <td className="p-4 border-b border-yellow-300 bg-black text-yellow-300">
                  {expense.description}
                </td>
                <td className="p-4 border-b border-yellow-300 bg-black text-yellow-300 text-center">
                  <button className="px-4 py-2 hover:bg-yellow-500 hover:text-black cursor-pointer rounded border border-yellow-300">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;

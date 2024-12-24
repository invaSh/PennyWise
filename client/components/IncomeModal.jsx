import React from "react";

function IncomeModal({ income, onClose, onUpdate, onDelete }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-yellow-300 text-xl font-bold mb-4">Edit Income</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onUpdate({
              ...income,
              source: e.target.source.value,
              amount: parseFloat(e.target.amount.value),
              dateReceived: e.target.dateReceived.value,
            });
            onClose();
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="source"
              className="block text-gray-400 text-sm mb-1"
            >
              Source
            </label>
            <input
              type="text"
              id="source"
              name="source"
              defaultValue={income.source}
              className="w-full px-3 py-2 bg-gray-700 text-yellow-300 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-400 text-sm mb-1"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              defaultValue={income.amount}
              className="w-full px-3 py-2 bg-gray-700 text-yellow-300 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dateReceived"
              className="block text-gray-400 text-sm mb-1"
            >
              Date Received
            </label>
            <input
              type="date"
              id="dateReceived"
              name="dateReceived"
              defaultValue={income.dateReceived}
              className="w-full px-3 py-2 bg-gray-700 text-yellow-300 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-300 text-black font-bold rounded hover:bg-yellow-400 transition"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => onDelete(income.id)}
              className="px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-gray-200 font-bold rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IncomeModal;
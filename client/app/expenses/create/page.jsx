"use client";

import React, { useState } from "react";
import { createExpense } from "@/app/actions/expenseActions";
import Alert from "@/components/Alert";

function Create() {
  const [category, setCategory] = useState(1);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState(""); 
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      category,
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
      description,
    };

    try {
      const response = await createExpense(formData);
      if (response.error) {
        setMessage("Failed to create expense. Please try again!");
        setMessageType("error");
      } else {
        setMessage("Expense created successfully!");
        setMessageType("success");
      }
    } catch (error) {
      console.error(error);
      setMessage("An unexpected error occurred!");
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
      <Alert message={message} messageType={messageType} />
      <div className="bg-black p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-yellow-300 mb-6 text-center">
          Add Expense
        </h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm text-yellow-200">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
              className="mt-2 w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value={1}>Food</option>
              <option value={2}>Transportation</option>
              <option value={3}>Entertainment</option>
              <option value={4}>Utilities</option>
              <option value={5}>Healthcare</option>
              <option value={6}>Education</option>
              <option value={7}>Miscellaneous</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm text-yellow-200">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm text-yellow-200">
              Date
            </label>
            <input
              id="date"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm text-yellow-200"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows="4"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;

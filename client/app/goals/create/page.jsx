"use client";

import React, { useState } from "react";
import { createGoal } from "@/app/actions/goalsActions";
import Alert from "@/components/Alert";

function Create() {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount),
      targetDate: new Date(targetDate).toISOString(),
      description,
    };

    try {
      const response = await createGoal(formData);
      if (response.error) {
        console.log("error-->", response);
        setMessage("Failed to create goal. Please try again!");
        setMessageType("error");
      } else {
        console.log("success-->", response);
        setMessage("Goal created successfully!");
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
      <Alert message={message} messageType={messageType} redirection={`goals`}/>
      <div className="bg-black p-8 rounded-xl shadow-lg w-full max-w-4xl animate__animated animate__fadeInDown">
        <h2 className="text-2xl font-bold text-yellow-300 mb-6 text-center">
          Add Goal
        </h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm text-yellow-200">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="targetAmount"
              className="block text-sm text-yellow-200"
            >
              Target Amount
            </label>
            <input
              id="targetAmount"
              type="number"
              step="0.01"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="currentAmount"
              className="block text-sm text-yellow-200"
            >
              Current Amount
            </label>
            <input
              id="currentAmount"
              type="number"
              step="0.01"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="targetDate"
              className="block text-sm text-yellow-200"
            >
              Target Date
            </label>
            <input
              id="targetDate"
              type="datetime-local"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="mb-4">
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

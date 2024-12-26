'use client';
import React from 'react';
import { creteIncome } from '@/app/actions/incomeActions';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = async (data) => {
    const loadingToast = toast.loading('Loading...');
    try {
      const response = await creteIncome(data);
      if (response.error) {
        toast.error('Problem creating the income.');
      } else {
        toast.success('Income creating successfully!');
        setTimeout(() => {
          window.location.href = '/incomes';
        }, 2000);
      }
    } catch (e) {
      console.error('income --> ', e);
    } finally {
      toast.dismiss(loadingToast);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <div className="bg-black p-8 rounded-xl shadow-lg w-full max-w-md animate__animated animate__fadeInDown">
        <h2 className="text-2xl font-bold text-yellow-300 mb-6 text-center">
          Add Income
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="source"
              className="block text-gray-400 text-sm mb-1"
            >
              Source
            </label>
            <input
              id="source"
              {...register('source', { required: true })}
              className="w-full px-3 py-2 bg-gray-700 text-yellow-300 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            {errors.source && (
              <span className="text-red-400 py-3">Source is required!</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-400 text-sm mb-1"
            >
              Amount
            </label>
            <input
              id="amount"
              step="0.01"
              {...register('amount', { required: true })}
              className="w-full px-3 py-2 bg-gray-700 text-yellow-300 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            {errors.amount && (
              <span className="text-red-400 py-3">Amount is required!</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="dateReceived"
              className="block text-gray-400 text-sm mb-1"
            >
              Type
            </label>
            <select
              id="type"
              {...register('type', { required: true })}
              className="mt-2 w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value={0}>Salary</option>
              <option value={1}>Freelance</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-300 text-black font-bold rounded hover:bg-yellow-400 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;

'use client';
import React, { useState, useEffect } from 'react';
import { updateIncome, deleteIncome } from '@/app/actions/incomeActions';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

function IncomeModal({ income, closeModal, handleDelete }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const onSubmit = async (data) => {
    const loadingToast = toast.loading('Loading...');
    try {
      const response = await updateIncome(income.id, data);
      if (response.error) {
        toast.error('Problem updating the income.');
      } else {
        toast.success('Income updated successfully!');
        setTimeout(() => {
          window.location.reload();
          closeModal();
        }, 2000);
      }
    } catch (e) {
      console.error('income --> ', e);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const onDelete = async (data) => {
    const loadingToast = toast.loading('Loading...');
    try {
      const response = await deleteIncome(data.id);
      if (response.error) {
        toast.error('Problem deleting the income.');
      } else {
        toast.success('Income deleted successfully!');
        setTimeout(() => {
          window.location.reload();
          closeModal();
        }, 2000);
      }
    } catch (e) {
      console.error('income --> ', e);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleConfirmDelete = () => {
    setConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-5 w-full max-w-md relative animate__animated animate__fadeInUp animate__faster">
        <h2 className="text-yellow-300 text-xl font-bold mb-4">Edit Income</h2>
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
              defaultValue={income.source}
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
              defaultValue={income.amount}
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
              defaultValue={income.type}
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
        <form
          className="absolute right-32 bottom-6"
          onSubmit={handleSubmit(onDelete)}
        >
          <input
            id="id"
            type="hidden"
            defaultValue={income.id}
            {...register('id')}
          />
          {!confirmDelete && (
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          )}

          {confirmDelete && (
            <div className="mt-2 text-slate-100 flex gap-4 text-sm animate__animated animate__zoomIn animate__faster">
              <span>Are you sure you want to delete this?</span>
              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="cursor-pointer hover:text-red-400"
                >
                  Yes
                </button>
                <span
                  onClick={handleCancelDelete}
                  className="cursor-pointer hover:text-blue-500"
                >
                  Cancel
                </span>
              </div>
            </div>
          )}
        </form>
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-200 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}

export default IncomeModal;

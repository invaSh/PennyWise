import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import { updateExpense, deleteExpense } from '@/app/actions/expenseActions';
function ExpenseModal({ expense, closeModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [deleteConfirm, setDeleteConfirm] = useState();

  const onSubmit = async (data) => {
    const loadingToast = toast.loading('Loading...');
    try {
      const response = await updateExpense(expense.id, data);
      if (response.error) {
        toast.error('Problem updating the expense.');
      } else {
        toast.success('Expense updated successfully!');
        setTimeout(() => {
          window.location.reload();
          closeModal();
        }, 2000);
      }
    } catch (e) {
      console.error('error --> ', e);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const onDelete = async (data) => {
    const loadingToast = toast.loading('Loading...');
    try {
      const response = await deleteExpense(data.id);
      if (response.error) {
        toast.error('Problem deleting the expense.');
      } else {
        toast.success('Expense deleted successfully!');
        setTimeout(() => {
          window.location.reload();
          closeModal();
        }, 2000);
      }
    } catch (e) {
      console.error('error --> ', e);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(false);
    closeModal();
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-70 pt-5 flex items-start justify-center z-50`}
    >
      <div
        className={`bg-gray-800  mt-36 p-6 rounded-lg shadow-lg w-96  animate__animated animate__fadeInDown animate__faster relative`}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
        >
          <X size={24} />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-yellow-300 mb-4">
            Edit item
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm text-gray-300 mb-2">Amount</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-600 rounded-lg text-gray-900 font-medium"
                defaultValue={expense.amount}
                {...register('amount', { required: true })}
              />
              {errors.amount && (
                <span className="text-red-400 py-3">Amount is required!</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-300 mb-2">
                Category
              </label>
              <select
                className="w-full p-2 border border-gray-600 rounded-lg text-gray-900 font-medium"
                defaultValue={expense?.category}
                {...register('category', { required: true })}
              >
                <option value={`Food`}>Food</option>
                <option value={`Transportation`}>Transportation</option>
                <option value={`Entertainment`}>Entertainment</option>
                <option value={`Utilities`}>Utilities</option>
                <option value={`Healthcare`}>Healthcare</option>
                <option value={`Education`}>Education</option>
                <option value={`Miscellaneous`}>Miscellaneous</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-300 mb-2">
                Description
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-600 rounded-lg text-gray-900 font-medium"
                defaultValue={expense.description}
                {...register('description', { required: true })}
              />
              {errors.description && (
                <span className="text-red-400 py-3">
                  Description is required!
                </span>
              )}
            </div>
            <button
              className="px-4 py-2 bg-yellow-300 text-gray-800 rounded-lg hover:bg-yellow-400 transition font-medium"
              type="submit"
            >
              Save Changes
            </button>
          </form>

          {!deleteConfirm && (
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition absolute bottom-6 left-[165]"
              type="button"
              onClick={() => setDeleteConfirm(true)}
            >
              Delete
            </button>
          )}
          {deleteConfirm && (
            <form onSubmit={handleSubmit(onDelete)}>
              <input
                id="id"
                type="hidden"
                defaultValue={expense.id}
                {...register('id')}
              />
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
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpenseModal;

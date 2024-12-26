import React, { useState } from 'react';
import { updateStatus, deleteGoal } from '@/app/actions/goalsActions';
import toast from 'react-hot-toast';
function GoalModal({ isOpen, closeModal, goal, modalAction }) {
  if (!goal) return null;
  const [status, setStatus] = useState(Number(goal.status) || 0);
  const formData = {
    status,
  };
  const handleChange = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Loading...');
    try {
      let response = await updateStatus(goal.id, formData);
      if (response.error) {
        toast.error('Problem updating the goal.');
      } else {
        toast.success('Goal status updated successfully!');
        setTimeout(() => {
          window.location.reload();
          closeModal();
        }, 2000);
      }
    } catch (e) {
      console.error('Error:', e);
      toast.error('Something went wrong. Please try again.');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const loadingToast = toast.loading('Loading...');
    try {
      const response = await deleteGoal(id);
      if (response.error) {
        toast.error('Problem deleting the goal.');
      } else {
        toast.success('Goal deleted successfully!');
        setTimeout(() => {
          window.location.reload();
          closeModal();
        }, 2000);
      }
    } catch (e) {
      console.error('delete---> ', e);
    }finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg w-96">
          <h2 className="text-yellow-300 text-xl font-semibold">
            {modalAction === 'Delete' ? 'Delete Goal' : 'Change Goal Status'}
          </h2>

          <div className="mt-4">
            {modalAction === 'Delete' ? (
              <form
                className="text-gray-300"
                onSubmit={(e) => handleDelete(e, goal.id)}
              >
                Are you sure you want to delete this goal?
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    className="px-4 py-2 bg-yellow-300 text-black rounded-md"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                    type="submit"
                  >
                    Delete
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={(e) => handleChange(e)}>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                  className="mt-2 w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value={0}>Active</option>
                  <option value={1}>Achieved</option>
                  <option value={2}>Failed</option>
                  <option value={3}>Archived</option>
                </select>

                <div className="mt-6 flex justify-end gap-4">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-300 text-gray-800 rounded-md"
                  >
                    Confirm Change
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default GoalModal;

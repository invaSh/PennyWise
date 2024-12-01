"use client";

import { useState } from "react";
import { updateExpense, deleteExpense } from "@/app/actions/expenseActions";
import { useRouter } from "next/navigation";

function Options({ modelId, modelDetails, url }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [formData, setFormData] = useState(modelDetails || {});
  const router = useRouter();

  if (!modelDetails) {
    return <span>Loading...</span>;
  }

  const handleDelete = async (e, url) => {
    e.preventDefault();
    console.log(`Deleting model with ID: ${modelId}`);
    try{
      const response = await deleteExpense(modelId);
      if (response.error) {
        console.log("Couldn't delete");
        setIsModalOpen(false);
        router.push(`/expenses?messageType=error`);
      } else {
        setIsModalOpen(false);
        router.push(`/expenses?messageType=success`);
      }
    }catch(e){
      console.error("errori--->", e);
      
    }
  };

  const handleEdit = async (e, url) => {
    e.preventDefault();
    console.log("Editing model:", formData);
    try {
      let response;
      if (url === "expenses") {
        response = await updateExpense(modelId, formData);
      }

      if (response.error) {
        console.log("Couldn't update");
        setIsModalOpen(false);
        router.push(`/expenses?messageType=error`);
      } else {
        setIsModalOpen(false);
        router.push(`/expenses?messageType=success`);
      }
    } catch (e) {
      console.error("errori qitu---->", e);
    }
  };

  return (
    <div className="flex gap-x-3">
      <span
        className="hover:text-yellow-300 transition-all duration-200 cursor-pointer"
        onClick={() => {
          setModalMode("edit");
          setIsModalOpen(true);
        }}
      >
        Edit
      </span>

      <span>|</span>

      <span
        className="hover:text-yellow-300 transition-all cursor-pointer duration-200"
        onClick={() => {
          setModalMode("delete");
          setIsModalOpen(true);
        }}
      >
        Delete
      </span>

      {isModalOpen && (
        <div
          className={`fixed inset-0 bg-gray-900 bg-opacity-70 pt-5 flex items-start justify-center z-50`}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={`bg-gray-800 p-6 rounded-lg shadow-lg w-96 animate__animated animate__faster
              ${isModalOpen ? "animate__fadeInDown" : "animate__fadeOutUp"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {modalMode === "edit" ? (
              <div>
                <h2 className="text-lg font-semibold text-yellow-300 mb-4">
                  Edit item
                </h2>
                <form onSubmit={(e) => handleEdit(e, url)}>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-300 mb-2">
                      Amount
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-600 rounded-lg text-gray-900 font-medium"
                      value={formData.amount || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      className="w-full p-2 border border-gray-600 rounded-lg text-gray-900 font-medium"
                      value={formData.category || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      <option value={0}>Food</option>
                      <option value={1}>Transportation</option>
                      <option value={2}>Entertainment</option>
                      <option value={3}>Utilities</option>
                      <option value={4}>Healthcare</option>
                      <option value={5}>Education</option>
                      <option value={6}>Miscellaneous</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-300 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-600 rounded-lg text-gray-900 font-medium"
                      value={formData.description || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex justify-end gap-x-4">
                    <button
                      className="px-4 py-2 bg-gray-600 text-yellow-300 rounded-lg hover:bg-gray-700 transition"
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-yellow-300 text-gray-800 rounded-lg hover:bg-yellow-400 transition"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <form onSubmit={(e) => handleDelete(e, url)}>
                <h2 className="text-lg font-semibold text-yellow-300 mb-4">
                  Confirm Delete
                </h2>
                <p className="text-sm text-gray-300 mb-6">
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </p>
                <div className="flex justify-end gap-x-4">
                  <button
                    className="px-4 py-2 bg-gray-600 text-yellow-300 rounded-lg hover:bg-gray-700 transition"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    type="submit"
                  >
                    Delete
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Options;

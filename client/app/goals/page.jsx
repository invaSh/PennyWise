'use client';
import React, { useState, useEffect } from 'react';
import { getGoals } from '../actions/goalsActions';
import { MoreVertical, Trash2, FilePenLine } from 'lucide-react';
import GoalModal from '@/components/GoalModal';

function List({ searchParams }) {
  const [goals, setGoals] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [modalAction, setModalAction] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      const data = await getGoals();
      setGoals(data);
    };

    fetchGoals();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleOptionSelect = (option, goal) => {
    setModalAction(option);
    setSelectedGoal(goal);
    setIsModalOpen(true);
    setActiveMenu(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedGoal(null);
    setModalAction(null);
  };

  const handleDeleteGoal = (goalId) => {
    console.log(`Deleted goal with ID: ${goalId}`);
    handleModalClose();
  };

  const handleStatusChange = (goalId, newStatus) => {
    console.log(`Changed status of goal with ID: ${goalId} to ${newStatus}`);
    handleModalClose();
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-yellow-300 text-4xl font-bold mb-6 text-center font-tektur animate__animated animate__slideInUp">
        My Goals
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal, index) => (
          <div
            key={goal.id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition hover:scale-105 relative animate__animated animate__fadeInUp"
            style={{ animationDelay: `${index * 0.09}s`, animationDuration: ".5s" }}
          >
            <div className="absolute top-2 right-2">
              <MoreVertical
                size={24}
                className="text-yellow-300 cursor-pointer hover:text-yellow-500 transition"
                onClick={() =>
                  setActiveMenu(activeMenu === goal.id ? null : goal.id)
                } 
              />
            </div>

            {activeMenu === goal.id && (
              <div className="absolute top-8 right-0 bg-gray-900 text-yellow-300 rounded-lg shadow-md w-48 p-2">
                <ul>
                  <li
                    className="cursor-pointer hover:bg-gray-700 p-2 rounded flex items-center gap-x-1"
                    onClick={() => handleOptionSelect('Change Status', goal)}
                  >
                    <FilePenLine />
                    Change goal status
                  </li>
                  <li
                    className="cursor-pointer hover:bg-gray-700 p-2 rounded flex items-center gap-x-1"
                    onClick={() => handleOptionSelect('Delete', goal)}
                  >
                    <Trash2 />
                    Delete
                  </li>
                </ul>
              </div>
            )}

            <h2 className="text-yellow-300 text-lg font-semibold">
              {goal.name}
            </h2>
            <p className="text-gray-300 mt-2">
              Goal Status:{' '}
              <span className="text-yellow-300">{goal.status}</span>
            </p>
            <p className="text-gray-300 mt-2">
              Target Amount:{' '}
              <span className="text-yellow-300">${goal.targetAmount}</span>
            </p>
            <p className="text-gray-300 mt-1">
              Started from:{' '}
              <span className="text-yellow-300">${goal.currentAmount}</span>
            </p>
            <p className="text-gray-400 mt-2 text-sm">
              Goal set:{' '}
              <span className="text-yellow-300">
                {formatDate(goal.createdDate)}
              </span>
            </p>
            <p className="text-gray-400 mt-2 text-sm">
              Target Date:{' '}
              <span className="text-yellow-300">
                {formatDate(goal.targetDate)}
              </span>
            </p>
            <p className="text-gray-500 mt-4 text-sm italic">
              "{goal.description}"
            </p>
            <div className="mt-4">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-yellow-300 text-gray-800 rounded-full">
                {goal.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <GoalModal
        isOpen={isModalOpen}
        closeModal={handleModalClose}
        goal={selectedGoal}
        modalAction={modalAction}
        onDelete={handleDeleteGoal}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default List;

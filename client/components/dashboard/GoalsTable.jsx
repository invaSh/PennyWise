import { Target, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const goalsData = [
  {
    icon: <Target className="text-yellow-300" size={24} />,
    title: 'Increase Revenue',
    progress: 75,
    status: 'On Track',
    statusColor: '#10B981',
  },
  {
    icon: <CheckCircle className="text-yellow-300" size={24} />,
    title: 'Launch New Product',
    progress: 100,
    status: 'Achieved',
    statusColor: '#10B981',
  },
  {
    icon: <AlertCircle className="text-yellow-300" size={24} />,
    title: 'Reduce Expenses',
    progress: 40,
    status: 'At Risk',
    statusColor: '#DC3545',
  },
  {
    icon: <Clock className="text-yellow-300" size={24} />,
    title: 'Improve Customer Retention',
    progress: 60,
    status: 'Behind Schedule',
    statusColor: '#FFBA00',
  },
];

const GoalsTable = () => {
  return (
    <div className="rounded-lg bg-black p-6 shadow-lg">
      <h4 className="mb-6 text-2xl font-semibold text-yellow-300">
        Monthly Goals
      </h4>

      <div>
        {goalsData.map((goal, key) => (
          <div
            className="flex items-center gap-4 py-4 px-4 rounded-lg hover:bg-gray-800 transition-colors"
            key={key}
          >
            <div className="flex-shrink-0">{goal.icon}</div>
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-yellow-300">{goal.title}</h5>
                <p className="text-sm text-gray-400">
                  Progress: {goal.progress}%
                </p>
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: goal.statusColor,
                  color: '#FFF',
                }}
              >
                {goal.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsTable;

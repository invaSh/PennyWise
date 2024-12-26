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
    <div className="col-span-12 rounded-sm  bg-black p-12 shadow-default xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-yellow-300">
        Monthly Goals
      </h4>

      <div>
        {goalsData.map((goal, key) => (
          <div
            className="flex items-center gap-5 py-3 px-7.5 hover:bg-yellow-300/20"
            key={key}
          >
            <div className="flex-shrink-0">{goal.icon}</div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-yellow-300">{goal.title}</h5>
                <p className="text-sm text-yellow-300">
                  Progress: {goal.progress}%
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block rounded-full px-2 py-1 text-xs font-medium"
                  style={{ backgroundColor: goal.statusColor, color: 'white' }}
                >
                  {goal.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsTable;

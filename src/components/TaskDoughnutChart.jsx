import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PieChart } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TaskDoughnutChart({ tasks, darkMode }) {
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  const data = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: tasks.length === 0 ? [1] : [completedCount, pendingCount],
        backgroundColor: tasks.length === 0
          ? [darkMode ? '#334155' : '#e2e8f0']
          : ['#10b981', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: darkMode ? '#94a3b8' : '#64748b',
          boxWidth: 12,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
        titleColor: darkMode ? '#f8fafc' : '#0f172a',
        bodyColor: darkMode ? '#cbd5e1' : '#334155',
        borderColor: darkMode ? '#334155' : '#e2e8f0',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
      },
    },
    cutout: '70%',
  };

  return (
    <div className="glass-card rounded-2xl p-6 shadow-md flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-lg">
            <PieChart className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">Task Completion Ratio</h3>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">Total: {tasks.length}</span>
      </div>

      <div className="h-56 w-full flex items-center justify-center relative">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mb-6">
          <span className="text-2xl font-bold text-slate-800 dark:text-white">
            {tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0}%
          </span>
          <span className="text-xs text-slate-400">Done</span>
        </div>
      </div>
    </div>
  );
}

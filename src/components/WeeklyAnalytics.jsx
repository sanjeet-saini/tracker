import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { BarChart3 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function WeeklyAnalytics({ weeklyData, darkMode }) {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Coding Hours',
        data: weeklyData,
        backgroundColor: darkMode ? 'rgba(99, 102, 241, 0.8)' : 'rgba(79, 70, 229, 0.8)',
        borderColor: darkMode ? '#818cf8' : '#4f46e5',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: darkMode ? '#94a3b8' : '#64748b',
        },
      },
      y: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: darkMode ? '#94a3b8' : '#64748b',
        },
        beginAtZero: true,
        max: 12,
      },
    },
  };

  return (
    <div className="glass-card rounded-2xl p-6 shadow-md flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">Weekly Time Analytics</h3>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">Mon - Sun</span>
      </div>

      <div className="h-64 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

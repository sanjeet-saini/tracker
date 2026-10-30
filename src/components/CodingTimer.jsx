import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, Award } from 'lucide-react';

export default function CodingTimer({ totalSeconds, setTotalSeconds, onSaveTime }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTotalSeconds(prev => {
          const updated = prev + 1;
          localStorage.setItem('tracker_coding_seconds', updated);
          return updated;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, setTotalSeconds]);

  const formatTime = (secs) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsActive(false);
    setTotalSeconds(0);
    localStorage.setItem('tracker_coding_seconds', 0);
  };

  const hoursLogged = (totalSeconds / 3600).toFixed(1);

  return (
    <div className="glass-card rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
            <Timer className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">Coding Time Tracker</h3>
        </div>
        <span className="text-xs font-medium px-2.5 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full">
          Today: {hoursLogged} hrs
        </span>
      </div>

      <div className="my-6 text-center">
        <div className="text-4xl sm:text-5xl font-mono font-bold tracking-wider text-slate-800 dark:text-white drop-shadow-sm">
          {formatTime(totalSeconds)}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          {isActive ? '🟢 Active coding session in progress...' : '⏸️ Timer paused'}
        </p>
      </div>

      <div className="flex items-center justify-center space-x-3">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium text-white shadow-lg transition-all ${
            isActive
              ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20'
          }`}
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isActive ? 'Pause' : 'Start Coding'}</span>
        </button>

        <button
          onClick={handleReset}
          className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all"
          title="Reset Timer"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

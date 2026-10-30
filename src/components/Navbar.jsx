import React from 'react';
import { Sun, Moon, Flame, Code2 } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode, streak = 5 }) {
  return (
    <header className="glass-card sticky top-0 z-50 px-6 py-4 mb-6 shadow-sm flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-md">
          <Code2 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Tracker
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Developer Productivity & Growth Dashboard</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-xs font-semibold border border-amber-500/20">
          <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>{streak} Day Streak</span>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl glass-card hover:scale-105 transition-all text-slate-700 dark:text-slate-200 shadow-sm"
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
        </button>
      </div>
    </header>
  );
}

import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

export default function TaskPlanner({ tasks, setTasks }) {
  const [newTaskText, setNewTaskText] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="glass-card rounded-2xl p-6 shadow-md flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <CheckSquare className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Task Planner</h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full">
            {progressPercent}% Complete
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mb-4 overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <form onSubmit={addTask} className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new development task..."
            className="flex-1 px-4 py-2 text-sm bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
          />
          <button
            type="submit"
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-all flex items-center justify-center"
            title="Add Task"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>

        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {tasks.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No tasks yet. Add one above!</p>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  task.completed
                    ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-75 line-through'
                    : 'bg-white/40 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center space-x-3 text-left flex-1 mr-2"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                  <span className={`text-sm ${task.completed ? 'text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'}`}>
                    {task.text}
                  </span>
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

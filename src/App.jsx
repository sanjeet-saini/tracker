import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CodingTimer from './components/CodingTimer';
import WeeklyAnalytics from './components/WeeklyAnalytics';
import TaskPlanner from './components/TaskPlanner';
import TaskDoughnutChart from './components/TaskDoughnutChart';
import GithubIntegration from './components/GithubIntegration';
import SkillTracker from './components/SkillTracker';
import SmartInsights from './components/SmartInsights';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('tracker_dark_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('tracker_dark_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const [totalSeconds, setTotalSeconds] = useState(() => {
    const saved = localStorage.getItem('tracker_coding_seconds');
    return saved !== null ? Number(saved) : 7200; // default 2 hours
  });

  const [weeklyData, setWeeklyData] = useState(() => {
    const saved = localStorage.getItem('tracker_weekly_data');
    return saved !== null ? JSON.parse(saved) : [4.5, 6.0, 8.2, 5.0, 7.5, 3.0, 6.5];
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tracker_tasks');
    return saved !== null ? JSON.parse(saved) : [
      { id: 1, text: 'Refactor authentication middleware', completed: true },
      { id: 2, text: 'Write unit tests for payment webhook', completed: false },
      { id: 3, text: 'Optimize database indexes for queries', completed: false },
      { id: 4, text: 'Review pull requests from teammates', completed: true },
    ];
  });

  useEffect(() => {
    localStorage.setItem('tracker_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('tracker_skills');
    return saved !== null ? JSON.parse(saved) : [
      { id: 1, name: 'React / Next.js', level: 90 },
      { id: 2, name: 'JavaScript / TypeScript', level: 85 },
      { id: 3, name: 'UI/UX Design', level: 75 },
      { id: 4, name: 'Python / FastAPI', level: 80 },
      { id: 5, name: 'Docker / DevOps', level: 65 },
    ];
  });

  useEffect(() => {
    localStorage.setItem('tracker_skills', JSON.stringify(skills));
  }, [skills]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4 sm:p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} streak={7} />

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Row 1: Coding Timer, Weekly Analytics, Task Planner */}
          <CodingTimer
            totalSeconds={totalSeconds}
            setTotalSeconds={setTotalSeconds}
          />
          <WeeklyAnalytics
            weeklyData={weeklyData}
            darkMode={darkMode}
          />
          <TaskPlanner
            tasks={tasks}
            setTasks={setTasks}
          />

          {/* Row 2: Task Doughnut Chart, GitHub Integration, Skill Tracker */}
          <TaskDoughnutChart
            tasks={tasks}
            darkMode={darkMode}
          />
          <GithubIntegration />
          <SkillTracker
            skills={skills}
            setSkills={setSkills}
          />

          {/* Row 3: Smart Insights (Span full width on lg) */}
          <div className="lg:col-span-3">
            <SmartInsights
              totalSeconds={totalSeconds}
              tasks={tasks}
              skills={skills}
            />
          </div>
        </main>

        <footer className="mt-12 text-center text-xs text-slate-500 dark:text-slate-400 py-4 border-t border-slate-200 dark:border-slate-800">
          Tracker — Developer Productivity & Growth Dashboard &bull; Built with React, Vite & Tailwind CSS
        </footer>
      </div>
    </div>
  );
}

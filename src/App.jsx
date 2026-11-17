import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CodingTimer from './components/CodingTimer';
import WeeklyAnalytics from './components/WeeklyAnalytics';
import TaskPlanner from './components/TaskPlanner';
import TaskDoughnutChart from './components/TaskDoughnutChart';
import GithubIntegration from './components/GithubIntegration';
import SkillTracker from './components/SkillTracker';
import SmartInsights from './components/SmartInsights';

const DAY_KEY = 'tracker_coding_day';
const todayKey = () => new Date().toDateString();
// 0 = Monday … 6 = Sunday, matching the weekly chart labels
const weekdayIndex = () => (new Date().getDay() + 6) % 7;

// Consecutive days (up to 7) with coding time, counting back from today.
// If nothing is logged yet today, the streak continues from yesterday.
function codingStreak(weeklyData) {
  let streak = 0;
  const start = weeklyData[weekdayIndex()] > 0 ? 0 : 1;
  for (let i = start; i < 7; i++) {
    const index = (weekdayIndex() - i + 7) % 7;
    if (weeklyData[index] > 0) streak++;
    else break;
  }
  return streak;
}

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

  // The timer counts today's coding time only: it starts from 0 on a new day.
  const [totalSeconds, setTotalSeconds] = useState(() => {
    const savedDay = localStorage.getItem(DAY_KEY);
    const saved = localStorage.getItem('tracker_coding_seconds');
    if (savedDay !== todayKey()) return 0;
    return saved !== null ? Number(saved) : 0;
  });

  // Hours per weekday (Mon–Sun). Starts with sample data; today's bar is live.
  const [weeklyData, setWeeklyData] = useState(() => {
    const saved = localStorage.getItem('tracker_weekly_data');
    return saved !== null ? JSON.parse(saved) : [4.5, 6.0, 8.2, 5.0, 7.5, 3.0, 6.5];
  });

  // Keep today's bar in the weekly chart in sync with the timer
  useEffect(() => {
    localStorage.setItem(DAY_KEY, todayKey());
    localStorage.setItem('tracker_coding_seconds', totalSeconds);
    setWeeklyData((prev) => {
      const next = [...prev];
      next[weekdayIndex()] = Number((totalSeconds / 3600).toFixed(2));
      localStorage.setItem('tracker_weekly_data', JSON.stringify(next));
      return next;
    });
  }, [totalSeconds]);

  const streak = codingStreak(weeklyData);

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tracker_tasks');
    return saved !== null ? JSON.parse(saved) : [
      { id: 1, text: 'Build a responsive navbar with React', completed: true },
      { id: 2, text: 'Practice JavaScript array methods', completed: false },
      { id: 3, text: 'Style the dashboard with Tailwind CSS', completed: false },
      { id: 4, text: 'Push today\'s work to GitHub', completed: true },
    ];
  });

  useEffect(() => {
    localStorage.setItem('tracker_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('tracker_skills');
    return saved !== null ? JSON.parse(saved) : [
      { id: 1, name: 'HTML / CSS', level: 85 },
      { id: 2, name: 'JavaScript', level: 75 },
      { id: 3, name: 'React', level: 70 },
      { id: 4, name: 'Tailwind CSS', level: 70 },
      { id: 5, name: 'Node.js / Express', level: 40 },
    ];
  });

  useEffect(() => {
    localStorage.setItem('tracker_skills', JSON.stringify(skills));
  }, [skills]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4 sm:p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} streak={streak} />

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

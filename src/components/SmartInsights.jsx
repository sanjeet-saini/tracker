import React from 'react';
import { Sparkles, AlertCircle, CheckCircle, TrendingUp, Lightbulb } from 'lucide-react';

export default function SmartInsights({ totalSeconds, tasks, skills }) {
  const hours = totalSeconds / 3600;
  const completedTasks = tasks.filter(t => t.completed).length;
  const taskProgress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
  const avgSkill = skills.length > 0 ? skills.reduce((acc, s) => acc + s.level, 0) / skills.length : 0;

  const timeInsight = hours < 2 ? {
    type: 'warning',
    title: 'Low Coding Time Today',
    desc: 'You have logged less than 2 hours of coding today. Try squeezing in a focused 30-minute sprint!',
    icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
    bg: 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300'
  } : {
    type: 'success',
    title: 'Great Momentum!',
    desc: `You've logged ${hours.toFixed(1)} hours of active coding today. Keep up the phenomenal consistency!`,
    icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300'
  };

  const taskInsight = tasks.length > 0 && taskProgress === 100 ? {
    title: 'All Tasks Completed!',
    desc: 'Fantastic job completing your entire task list for the day. Time to relax or level up a skill.',
    icon: <Sparkles className="w-5 h-5 text-indigo-500" />,
    bg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-700 dark:text-indigo-300'
  } : {
    title: 'Task Execution',
    desc: `You have completed ${completedTasks} out of ${tasks.length} tasks. Focus on knocking out the remaining items.`,
    icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
    bg: 'bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-300'
  };

  const skillInsight = avgSkill >= 75 ? {
    title: 'High Skill Proficiency',
    desc: `Your average skill level is ${Math.round(avgSkill)}%. You are approaching expert proficiency across your tech stack!`,
    icon: <Sparkles className="w-5 h-5 text-teal-500" />,
    bg: 'bg-teal-500/10 border-teal-500/20 text-teal-700 dark:text-teal-300'
  } : {
    title: 'Skill Growth Opportunity',
    desc: `Average skill level is ${Math.round(avgSkill)}%. Consider dedicating 15 minutes today to practicing a lagging skill.`,
    icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
    bg: 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300'
  };

  const list = [timeInsight, taskInsight, skillInsight];

  return (
    <div className="glass-card rounded-2xl p-6 shadow-md flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">Smart Insights & AI Coach</h3>
        </div>

        <div className="space-y-3">
          {list.map((item, idx) => (
            <div key={idx} className={`p-4 rounded-xl border flex items-start space-x-3 ${item.bg}`}>
              <div className="shrink-0 mt-0.5">{item.icon}</div>
              <div>
                <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                <p className="text-xs opacity-90 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

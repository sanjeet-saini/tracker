import React, { useState } from 'react';
import { Award, Zap, Plus } from 'lucide-react';

export default function SkillTracker({ skills, setSkills }) {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(50);

  const updateSkillLevel = (id, newLevel) => {
    setSkills(skills.map(s => s.id === id ? { ...s, level: Number(newLevel) } : s));
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    const newSkill = {
      id: Date.now(),
      name: newSkillName.trim(),
      level: Number(newSkillLevel),
    };
    setSkills([...skills, newSkill]);
    setNewSkillName('');
    setNewSkillLevel(50);
  };

  const avgSkill = skills.length > 0
    ? Math.round(skills.reduce((acc, curr) => acc + curr.level, 0) / skills.length)
    : 0;

  return (
    <div className="glass-card rounded-2xl p-6 shadow-md flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Skill Progress Tracker</h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full flex items-center space-x-1">
            <Zap className="w-3 h-3 mr-1" />
            Avg: {avgSkill}%
          </span>
        </div>

        <form onSubmit={addSkill} className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="New skill (e.g. Go, Rust)..."
            className="flex-1 px-3 py-2 text-sm bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
          />
          <input
            type="number"
            min="0"
            max="100"
            value={newSkillLevel}
            onChange={(e) => setNewSkillLevel(e.target.value)}
            className="w-16 px-2 py-2 text-sm bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 dark:text-slate-100 text-center"
            title="Proficiency %"
          />
          <button
            type="submit"
            className="p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-md transition-all flex items-center justify-center"
            title="Add Skill"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>

        <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
          {skills.map(skill => (
            <div key={skill.id} className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) => updateSkillLevel(skill.id, e.target.value)}
                  className="w-full accent-amber-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

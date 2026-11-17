# DevTracker – Developer Productivity & Growth Dashboard

A responsive productivity dashboard for developers. Track today's coding time, plan tasks, follow your skill growth and see your latest GitHub activity — all in one place, with charts and data saved in the browser.

**Live demo:** https://sanjeet-saini.github.io/tracker/

## Features

1. **Coding time tracker** – start/pause/reset timer for today's coding time. It starts again from zero on a new day.
2. **Weekly analytics** – Chart.js bar chart of coding hours (Mon–Sun). Today's bar updates live from the timer.
3. **Coding streak** – consecutive days with coding time, shown in the navbar.
4. **Task planner** – add, complete and delete daily tasks with a live progress bar.
5. **Task completion chart** – doughnut chart of completed vs pending tasks.
6. **GitHub activity** – enter any GitHub username to see their 5 most recently updated repositories (GitHub REST API).
7. **Skill progress tracker** – add skills, update levels (0–100%) and see your average level.
8. **Smart insights & tips** – rule-based suggestions generated from your coding time, tasks and skills.
9. **Dark / light mode** – theme choice saved in `localStorage`.

All data (timer, tasks, skills, theme) is stored in `localStorage`, so nothing is lost on refresh.

## Tech stack

- **React 18** with hooks (`useState`, `useEffect`)
- **Vite** for development and builds
- **Tailwind CSS** for styling and dark mode
- **Chart.js** + **react-chartjs-2** for charts
- **Lucide React** icons
- **GitHub REST API**

## Project structure

```
src/
├── App.jsx                     # App state, localStorage sync, layout
└── components/
    ├── Navbar.jsx              # Title, streak and theme toggle
    ├── CodingTimer.jsx         # Daily coding timer
    ├── WeeklyAnalytics.jsx     # Weekly hours bar chart
    ├── TaskPlanner.jsx         # Task list
    ├── TaskDoughnutChart.jsx   # Task completion chart
    ├── GithubIntegration.jsx   # GitHub repos by username
    ├── SkillTracker.jsx        # Skill levels
    └── SmartInsights.jsx       # Rule-based tips
```

## Getting started

```bash
git clone https://github.com/sanjeet-saini/tracker.git
cd tracker
npm install
npm run dev
```

## Deploy

The site is published to GitHub Pages from the `gh-pages` branch:

```bash
npm run deploy
```

This builds the app (with `base: '/tracker/'` in `vite.config.js`) and pushes the `dist` folder to `gh-pages`.

## Author

**Sanjeet Saini** · [GitHub](https://github.com/sanjeet-saini) · [LinkedIn](https://www.linkedin.com/in/sanjeet-saini-880b1827a)

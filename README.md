# 🏎️ F1 Dashboard — Interactive Race Analytics

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-red?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-App-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Data-2026 Season-black?style=for-the-badge" />
</p>

---

## Overview

An interactive Formula 1 dashboard built to visualize race results, driver standings, and constructor performance for the **2026 season**.

Designed with a focus on:

* Clean UI
* Dynamic navigation
* Real-time race insights
* Expandable architecture for future features

---

## Features

### Core Functionality

* Race calendar with navigation
* Driver and constructor standings
* Points calculation system (race + sprint)
* Individual race result views

### UI / UX Enhancements

* Hover-based interactions (minimal clutter)
* Conditional rendering (only show what matters)
* Responsive layout

### Data Handling

* Structured race data mapping
* Modular stat calculation logic
* Scalable for additional seasons

---

## Project Structure

```
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── RaceCard.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── RaceDetails.jsx
│   ├── Standings.jsx
│
├── data/
│   ├── races.js
│   ├── drivers.js
│   ├── constructors.js
│
├── utils/
│   ├── calculateStats.js
│
└── App.jsx
```

---

## Getting Started

### 1. Clone the repository

```
git clone https://github.com/dharumaran/f1-journal.git
cd f1-dashboard
```

### 2. Install dependencies

```
npm install
```

### 3. Run the app

```
npm run dev
```

---

## How It Works

<details>
<summary><strong>Points System Logic</strong></summary>

* Top 10 finishers get points:

```
25, 18, 15, 12, 10, 8, 6, 4, 2, 1
```

* Sprint races handled separately (if enabled)

* No fastest lap bonus (removed for accuracy)

</details>

<details>
<summary><strong>Navigation Flow</strong></summary>

* Home → Race List
* Click race → Race Details
* Standings → Aggregated stats

</details>

<details>
<summary><strong>State Management</strong></summary>

* Local state via React hooks
* Derived stats computed dynamically
* No external state library used

</details>

---

## Screens (Conceptual)

* Home → Race overview
* Race Page → Results + winner highlight (hover reveal)
* Standings → Leaderboard

---

## Future Improvements

* Constructor vs Driver comparison view
* Race pace visualization (charts)
* Dark/light theme toggle
* API integration for live data
* Chrome extension version (planned)

---

## Tech Stack

* React
* React Router
* JavaScript (ES6+)
* CSS / Tailwind (if used)

---

## Design Philosophy

* Show less by default, reveal on interaction
* Prioritize clarity over density
* Keep logic modular and reusable

---

## Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## License

This project is for educational and personal use.

---

<p align="center">
  Built with precision for Formula 1 fans.
</p>

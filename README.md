# 🏋️ FitLog — Workout Library

A dark, no-nonsense gym companion. Browse a library of lifts, lock your picks into today's plan, save others for later, and watch the day's work add up.

**Live site:** [add your deployed link here](#)
**Repository:** https://github.com/AkramMdkhan/B14-Assignment-6-Fit-Log

## 🛠️ Technologies Used

- **Next.js** (App Router) with **React** and **TypeScript**
- **React Compiler** for automatic optimizations
- **Tailwind CSS** for styling
- **react-hot-toast** for toast notifications
- **Browser localStorage** for persisting the plan and saved lists between visits
- A hosted REST API for the workout data

## ✨ Key Features

1. **Workout Library** — twelve lifts shown as responsive cards (3-column grid on large screens) with category tags, equipment, duration, calories and rating, plus a loading skeleton while the data is fetched.
2. **Search by Name or Tag** — a live search box filters the library instantly by workout name or muscle-group tag, with a clear empty state when nothing matches.
3. **Workout Details Page** — a two-column layout with a large image, key specs table, step-by-step instructions, and buttons to add the lift to today's plan or save it for later.
4. **Today's Plan with a 5-Lift Cap** — add lifts to the plan (up to five), with live Plan and Saved counters in the navbar and toast messages naming each action.
5. **My Plan Page** — Today's Plan and Saved tabs, live Exercises / Minutes / Calories totals, a Sort By dropdown (Duration, Calories, Rating), and Mark as Done / Remove buttons on every card.
6. **Persistence and 404 Handling** — your plan and saved lists survive a page reload via localStorage, and any unknown route shows a custom 404 page.

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/AkramMdkhan/B14-Assignment-6-Fit-Log.git
cd B14-Assignment-6-Fit-Log

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/            # Pages: home, /workout/[id], /my-plan, 404
├── components/     # Navbar, Banner, Footer, WorkoutCard, LibraryView, MyPlanView...
├── context/        # PlanContext (plan/saved state + localStorage)
├── lib/            # API helpers
└── types/          # TypeScript types
```

## 📸 Design

The interface was built from the FitLog Figma design and is fully responsive across mobile, tablet and desktop.
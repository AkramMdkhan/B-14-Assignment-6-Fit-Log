"use client";

import { useMemo, useState } from "react";

import type { Workout } from "@/types/workout";
import WorkoutCard from "@/components/WorkoutCard";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function LibraryView({ workouts }: { workouts: Workout[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return workouts;

    return workouts.filter((workout) => {
      const nameMatch = workout.name.toLowerCase().includes(q);
      const tagMatch = workout.muscleGroups.some((tag) =>
        tag.toLowerCase().includes(q)
      );
      return nameMatch || tagMatch;
    });
  }, [workouts, query]);

  return (
    <>
      {/* Search box */}
      <div className="relative mb-6 max-w-sm">
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#6b6f76]" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name or tag…"
          aria-label="Search workouts by name or tag"
          className="w-full rounded-full border border-white/10 bg-[#12151c] py-2.5 pl-10 pr-9 text-sm text-white placeholder:text-[#6b6f76] focus:outline-none focus-visible:border-[#c8f31d]/60"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center text-[#6b6f76] transition hover:text-white"
          >
            <XIcon className="size-4" />
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/15 py-16 text-center">
          <p className="text-sm text-[#9a9ca8]">
            No workouts match &ldquo;{query}&rdquo;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </>
  );
}
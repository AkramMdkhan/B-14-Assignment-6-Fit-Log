"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import {
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  FlameIcon,
  StarIcon,
  XIcon,
} from "@/components/icons";

type Tab = "plan" | "saved";
type SortKey = "duration" | "caloriesBurned" | "rating";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

const headingFont = "font-[family-name:var(--font-oswald)]";

export function PlanLoading() {
  return (
    <div
      role="status"
      className="mt-8 flex min-h-[300px] items-center justify-center gap-3 text-sm text-[#9a9ca8]"
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-[#c8f31d]" />
      Loading workouts…
    </div>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="px-4 sm:px-6">
      <p className="text-xs text-[#8b8e96] sm:text-sm">{label}</p>
      <p
        className={`${headingFont} mt-2 text-3xl font-bold leading-none sm:text-[40px] ${
          accent ? "text-[#c8f31d]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-5 flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 px-4 py-12 text-center">
      <h2
        className={`${headingFont} text-xl font-bold uppercase tracking-wide text-white`}
      >
        Nothing here yet
      </h2>
      <p className="mt-2 text-sm text-[#9a9ca8]">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-[#c8f31d] px-6 py-2.5 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(200,243,29,0.2)] transition hover:brightness-95"
      >
        Go to workouts
      </Link>
    </div>
  );
}

function PlanCard({ workout, tab }: { workout: Workout; tab: Tab }) {
  const {
    planIds,
    doneIds,
    isPlanFull,
    addToPlan,
    removeFromPlan,
    removeFromSaved,
    markDone,
  } = usePlan();

  const isDone = tab === "plan" && doneIds.includes(workout.id);
  const inPlan = planIds.includes(workout.id);

  return (
    <li
      className={`flex flex-col gap-4 rounded-xl border bg-[#12151c] p-3 sm:flex-row sm:items-center sm:p-4 ${
        isDone ? "border-[#c8f31d]/30" : "border-white/10"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        {/* Thumbnail */}
        <div className="relative h-16 w-32 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`${headingFont} text-lg font-bold uppercase leading-tight text-white`}
            >
              {workout.name}
            </h3>
            {isDone && (
              <span className="rounded-full border border-[#c8f31d]/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#c8f31d]">
                Done
              </span>
            )}
          </div>

          <p className="mt-0.5 text-[13px] font-medium text-[#8b8e96]">
            {workout.equipment}
          </p>

          {/* Stats: green icons, gray text */}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#b4b6be]">
            <span className="flex items-center gap-1.5">
              <ClockIcon className="size-3.5" style={{ color: "#c8f31d" }} />
              {workout.duration} min
            </span>
            <span className="flex items-center gap-1.5">
              <FlameIcon
                className="size-3.5"
                style={{ color: "#c8f31d", fill: "#c8f31d" }}
              />
              {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1.5">
              <StarIcon className="size-3.5" style={{ color: "#c8f31d" }} />
              {workout.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-white/20 px-5 py-2 text-xs font-medium text-white transition hover:bg-white/5 sm:text-[13px]"
        >
          View Details
        </Link>

        {tab === "plan" ? (
          <button
            type="button"
            onClick={() => markDone(workout.id, workout.name)}
            disabled={isDone}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#c8f31d] px-5 py-2 text-xs font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 sm:text-[13px]"
          >
            <CheckIcon className="size-4" />
            {isDone ? "Done" : "Mark as Done"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => addToPlan(workout.id, workout.name)}
            disabled={inPlan || isPlanFull}
            className="rounded-full bg-[#c8f31d] px-5 py-2 text-xs font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 sm:text-[13px]"
          >
            {inPlan ? "In plan" : "Add to Plan"}
          </button>
        )}

        <button
          type="button"
          onClick={() =>
            tab === "plan"
              ? removeFromPlan(workout.id, workout.name)
              : removeFromSaved(workout.id, workout.name)
          }
          aria-label={
            tab === "plan" ? "Remove from today's plan" : "Remove from saved"
          }
          className="flex size-9 items-center justify-center rounded-full text-[#6b6f76] transition hover:text-red-400"
        >
          <XIcon className="size-4" />
        </button>
      </div>
    </li>
  );
}

export default function MyPlanView({ workouts }: { workouts: Workout[] }) {
  const { planIds, savedIds, isHydrated } = usePlan();
  const [tab, setTab] = useState<Tab>("plan");
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  // saved data is read from localStorage after the first render
  if (!isHydrated) {
    return <PlanLoading />;
  }

  const byId = new Map(workouts.map((workout) => [workout.id, workout]));
  const pick = (ids: number[]) =>
    ids
      .map((id) => byId.get(id))
      .filter((workout): workout is Workout => Boolean(workout));

  const planItems = pick(planIds);
  const savedItems = pick(savedIds);

  const totalMinutes = planItems.reduce((sum, item) => sum + item.duration, 0);
  const totalCalories = planItems.reduce(
    (sum, item) => sum + item.caloriesBurned,
    0
  );

  // highest value first
  const visible = [...(tab === "plan" ? planItems : savedItems)].sort(
    (a, b) => b[sortKey] - a[sortKey]
  );

  return (
    <>
      {/* Metrics */}
      <div className="mt-6 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-[#12151c] py-6">
        <Stat label="Exercises" value={planItems.length} accent />
        <Stat label="Minutes" value={totalMinutes} />
        <Stat label="Calories" value={totalCalories} />
      </div>

      {/* Tabs + sort */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          className="flex gap-1 rounded-xl border border-white/10 bg-[#12151c] p-1"
        >
          {(
            [
              { key: "plan", label: "Today's Plan" },
              { key: "saved", label: "Saved" },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={tab === item.key}
              onClick={() => setTab(item.key)}
              className={`rounded-lg px-4 py-2 text-sm transition sm:px-5 ${
                tab === item.key
                  ? "bg-[#1e222b] font-semibold text-white"
                  : "text-[#8b8e96] hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3 text-sm text-[#8b8e96]">
          <span>Sort By</span>
          <span className="relative">
            <select
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value as SortKey)}
              className="appearance-none rounded-lg border border-white/10 bg-[#12151c] py-2 pl-3 pr-9 text-sm text-white focus:outline-none focus-visible:border-[#c8f31d]/60"
            >
              {SORT_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-[#12151c]"
                >
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#8b8e96]" />
          </span>
        </label>
      </div>

      {/* List or empty state */}
      {visible.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="mt-5 space-y-3">
          {visible.map((workout) => (
            <PlanCard key={workout.id} workout={workout} tab={tab} />
          ))}
        </ul>
      )}
    </>
  );
}
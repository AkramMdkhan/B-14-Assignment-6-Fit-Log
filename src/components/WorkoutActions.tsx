"use client";

import { usePlan } from "@/context/PlanContext";

type WorkoutActionsProps = {
  workoutId: number;
  workoutName: string;
};

function CalendarPlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="12" y1="14" x2="12" y2="18" />
      <line x1="10" y1="16" x2="14" y2="16" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

export default function WorkoutActions({
  workoutId,
  workoutName,
}: WorkoutActionsProps) {
  const { planIds, isPlanFull, addToPlan, saveForLater } = usePlan();

  const inPlan = planIds.includes(workoutId);
  const addDisabled = isPlanFull && !inPlan;

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => addToPlan(workoutId, workoutName)}
        disabled={addDisabled}
        title={addDisabled ? "Today's plan is full (5 lifts max)" : undefined}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c8f31d] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <CalendarPlusIcon />
        Add to today&apos;s plan
      </button>

      <button
        type="button"
        onClick={() => saveForLater(workoutId, workoutName)}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-transparent px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5"
      >
        <BookmarkIcon />
        Save for later
      </button>
    </div>
  );
}
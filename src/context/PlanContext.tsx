"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import toast from "react-hot-toast";

const STORAGE_KEY = "fitlog-state";
const TOAST_ID = "fitlog-toast";
export const PLAN_LIMIT = 5;

type StoredState = {
  plan: number[];
  saved: number[];
  done: number[];
};

type PlanContextValue = {
  planIds: number[];
  savedIds: number[];
  doneIds: number[];
  isHydrated: boolean;
  isPlanFull: boolean;
  addToPlan: (id: number, name?: string) => void;
  saveForLater: (id: number, name?: string) => void;
  removeFromPlan: (id: number, name?: string) => void;
  removeFromSaved: (id: number, name?: string) => void;
  markDone: (id: number, name?: string) => void;
};

const EMPTY_STATE: StoredState = { plan: [], saved: [], done: [] };

const isNumberArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every((item) => typeof item === "number");

/* ---------- Toasts (one at a time: a new toast replaces the old one) ---------- */

const notifySuccess = (message: string) =>
  toast.success(message, { id: TOAST_ID });

const notifyInfo = (message: string) =>
  toast(message, { id: TOAST_ID, icon: "ℹ️" });

const notifyError = (message: string) =>
  toast.error(message, { id: TOAST_ID });

/* ---------- Small store backed by localStorage ---------- */

let current: StoredState | null = null;
const listeners = new Set<() => void>();

function load(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw);
    return {
      plan: isNumberArray(parsed.plan) ? parsed.plan : [],
      saved: isNumberArray(parsed.saved) ? parsed.saved : [],
      done: isNumberArray(parsed.done) ? parsed.done : [],
    };
  } catch {
    return EMPTY_STATE;
  }
}

function getSnapshot(): StoredState {
  if (current === null) current = load();
  return current;
}

function getServerSnapshot(): StoredState {
  return EMPTY_STATE;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function update(change: (state: StoredState) => StoredState) {
  const next = change(getSnapshot());
  current = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable: the state still works for this session
  }
  listeners.forEach((listener) => listener());
}

/* ---------- Actions (always read the latest state) ---------- */

function addToPlan(id: number, name = "Workout") {
  const state = getSnapshot();
  if (state.plan.includes(id)) {
    notifyInfo(`${name} is already in today's plan`);
    return;
  }
  if (state.plan.length >= PLAN_LIMIT) {
    notifyError(`Today's plan is full (${PLAN_LIMIT} lifts max)`);
    return;
  }
  update((s) => ({ ...s, plan: [...s.plan, id] }));
  notifySuccess(`${name} added to today's plan`);
}

function saveForLater(id: number, name = "Workout") {
  if (getSnapshot().saved.includes(id)) {
    notifyInfo(`${name} is already saved`);
    return;
  }
  update((s) => ({ ...s, saved: [...s.saved, id] }));
  notifySuccess(`${name} saved for later`);
}

function removeFromPlan(id: number, name = "Workout") {
  update((s) => ({
    ...s,
    plan: s.plan.filter((item) => item !== id),
    done: s.done.filter((item) => item !== id),
  }));
  notifySuccess(`${name} removed from today's plan`);
}

function removeFromSaved(id: number, name = "Workout") {
  update((s) => ({ ...s, saved: s.saved.filter((item) => item !== id) }));
  notifySuccess(`${name} removed from saved`);
}

function markDone(id: number, name = "Workout") {
  if (getSnapshot().done.includes(id)) {
    notifyInfo(`${name} is already marked as done`);
    return;
  }
  update((s) => ({ ...s, done: [...s.done, id] }));
  notifySuccess(`${name} marked as done`);
}

/* ---------- Context ---------- */

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // false on the server and during hydration, true afterwards
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  return (
    <PlanContext.Provider
      value={{
        planIds: state.plan,
        savedIds: state.saved,
        doneIds: state.done,
        isHydrated,
        isPlanFull: state.plan.length >= PLAN_LIMIT,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used inside <PlanProvider>");
  }
  return context;
}
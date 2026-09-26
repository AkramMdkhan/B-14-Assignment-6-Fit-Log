import type { Workout } from "@/types/workout";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_URL, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error(`Failed to load workouts (${res.status})`);
  }

  return res.json();
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  const res = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    next: { revalidate: 3600 },
  });

  // unknown or invalid id
  if (res.status === 404 || res.status === 400) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to load workout (${res.status})`);
  }

  const data = await res.json();
  const workout = data?.data ?? data;

  return workout && typeof workout === "object" && "id" in workout
    ? (workout as Workout)
    : null;
}
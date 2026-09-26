import { getWorkouts } from "@/lib/workouts";
import LibraryView from "@/components/LibraryView";

function LibraryHeading() {
  return (
    <header className="mb-6">
      <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase text-white">
        The Library
      </h2>
      <p className="mt-1 text-sm text-gray-400">
        Twelve lifts covering every major muscle group.
      </p>
    </header>
  );
}

export default async function LibrarySection() {
  const workouts = await getWorkouts();

  return (
    <section id="library" className="mx-auto max-w-8xl scroll-mt-20 px-4 py-12 sm:px-6">
      <LibraryHeading />
      <LibraryView workouts={workouts} />
    </section>
  );
}

/** Shown by <Suspense> while the API request is in flight. */
export function LibrarySkeleton() {
  return (
    <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6">
      <LibraryHeading />
      <div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        aria-busy="true"
        aria-label="Loading workouts"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-white/10 bg-[#12151c]"
          >
            <div className="aspect-[2/1] w-full animate-pulse bg-white/5" />
            <div className="space-y-3 p-5">
              <div className="flex gap-2">
                <div className="h-5 w-14 animate-pulse rounded-full bg-white/10" />
                <div className="h-5 w-14 animate-pulse rounded-full bg-white/10" />
              </div>
              <div className="h-6 w-3/4 animate-pulse rounded bg-white/10" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-white/5" />
              <div className="h-4 w-full animate-pulse rounded bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
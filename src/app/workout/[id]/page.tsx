import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Oswald } from "next/font/google";

import { getWorkoutById } from "@/lib/workouts";
import WorkoutActions from "@/components/WorkoutActions";

const headingFont = Oswald({ subsets: ["latin"], weight: "700" });

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  return {
    title: workout ? `${workout.name} — FitLog` : "Workout not found — FitLog",
    description: workout?.description,
  };
}

export default async function WorkoutDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: String(workout.rating) },
  ];

  return (
    <section className="w-full bg-[#0b0d10] px-4 py-6 sm:px-6">
      <div className="mx-auto grid max-w-[1240px] gap-6 lg:grid-cols-2 lg:gap-12">
        {/* LEFT - IMAGE (stretches to match the right column on large screens) */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 lg:aspect-auto lg:min-h-[480px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
          />
        </div>

        {/* RIGHT - DETAILS */}
        <div>
          <h1
            className={`${headingFont.className} text-4xl font-bold uppercase leading-[1.05] text-white lg:text-[42px]`}
          >
            {workout.name}
          </h1>

          <p className="mt-2 max-w-xl text-base leading-relaxed text-[#9a9ca8]">
            {workout.description}
          </p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-[#c8f31d] px-3.5 py-1 text-xs font-semibold text-black"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Key specs */}
          <dl className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-[#12151c]">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-3 last:border-b-0"
              >
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#8b8e96]">
                  {spec.label}
                </dt>
                <dd className="text-right text-sm text-white">{spec.value}</dd>
              </div>
            ))}
          </dl>

          {/* Instructions */}
          <h2 className="mt-6 text-sm font-bold uppercase tracking-wide text-white">
            Instructions
          </h2>
          <ol className="mt-3 space-y-2">
            {workout.instructions.map((step, index) => (
              <li
                key={index}
                className="flex gap-2.5 text-sm leading-relaxed text-[#b4b6be]"
              >
                <span className="shrink-0 text-[#8b8e96]">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          {/* Buttons */}
         <WorkoutActions workoutId={workout.id} workoutName={workout.name} />
        </div>
      </div>
    </section>
  );
}
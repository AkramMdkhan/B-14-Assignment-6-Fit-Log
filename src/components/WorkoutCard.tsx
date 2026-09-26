import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/types/workout";

type WorkoutCardProps = {
  workout: Workout;
};

type IconProps = { className?: string };

function ClockIcon({ className }: IconProps) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FlameIcon({ className }: IconProps) {
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
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function StarIcon({ className }: IconProps) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const { id, name, image, muscleGroups, equipment, duration, caloriesBurned, rating } =
    workout;

  return (
    <Link
      href={`/workout/${id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#12151c] transition hover:border-[#ccff00]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ccff00]"
    >
      {/* Image */}
      <div className="relative aspect-[2/1] w-full overflow-hidden">
         <Image
             src={image}
             alt={name}
             fill
             sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
             className="object-cover opacity-0 transition-opacity duration-300 group-hover:scale-105"
             onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
           />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-[#ccff00] px-2.5 py-1 text-[11px] font-bold uppercase leading-none tracking-wide text-black"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase leading-tight text-white">
          {name}
        </h3>

        {/* Equipment */}
        <p className="text-xs text-gray-400">{equipment}</p>

        {/* Stats */}
        <div className="mt-auto flex items-center gap-5 border-t border-white/10 pt-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <ClockIcon className="size-3.5" />
            {duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <FlameIcon className="size-3.5" />
            {caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <StarIcon className="size-3.5" />
            {rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
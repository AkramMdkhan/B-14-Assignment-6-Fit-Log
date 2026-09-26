import type { Metadata } from "next";
import { Suspense } from "react";

import { getWorkouts } from "@/lib/workouts";
import MyPlanView, { PlanLoading } from "@/components/MyPlanView";

export const metadata: Metadata = {
  title: "My Plan — FitLog",
};

async function PlanLoader() {
  const workouts = await getWorkouts();
  return <MyPlanView workouts={workouts} />;
}

export default function MyPlanPage() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-12 lg:py-10">
      <h1 className="font-[family-name:var(--font-oswald)] text-4xl font-bold uppercase leading-none text-white sm:text-5xl">
        My Plan
      </h1>
      <p className="mt-3 text-sm text-[#9a9ca8] sm:text-base">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <Suspense fallback={<PlanLoading />}>
        <PlanLoader />
      </Suspense>
    </section>
  );
}
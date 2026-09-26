import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="text-center">
        <p className="font-[family-name:var(--font-oswald)] text-8xl font-bold leading-none text-[#c8f31d] sm:text-9xl">
          404
        </p>

        <h1 className="mt-4 font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-wide text-white">
          Page not found
        </h1>

        <p className="mx-auto mt-2 max-w-sm text-sm text-[#9a9ca8]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#c8f31d] px-6 py-2.5 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(200,243,29,0.2)] transition hover:brightness-95"
        >
          Go to workouts
        </Link>
      </div>
    </section>
  );
}
import Image from "next/image";
import Link from "next/link";
import { Oswald } from "next/font/google";
import logo from "@/assets/banner.png"

const headingFont = Oswald({ subsets: ["latin"], weight: "700" });



export default function Banner() {
  return (
    <section className="bg-[#0b0d10] px-3 py-6 sm:px-4 sm:py-8 lg:px-6 lg:py-10">
      <div className="mx-auto flex flex-col items-center gap-8 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#14151b] px-6 py-10 sm:px-10 md:min-h-[420px] md:flex-row md:justify-between md:gap-6 md:px-12 md:py-0 lg:min-h-[450px] lg:px-16 2xl:min-h-[540px] 2xl:px-24">
        {/* Text */}
        <div className="w-full md:max-w-[58%]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#c8f31d] 2xl:text-xs">
            Workout Library
          </p>

          <h1
            className={`${headingFont.className} mt-4 max-w-[10em] text-4xl font-bold uppercase leading-[1.02] text-white sm:mt-5 sm:text-5xl lg:text-6xl 2xl:text-7xl`}
          >
            Train with intent. Log every set.
          </h1>

          <p className="mt-4 max-w-[30rem] text-sm leading-relaxed text-[#9a9ca8] sm:mt-5 sm:text-base 2xl:max-w-[36rem] 2xl:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

         <Link
              href="#library"
              className="mt-7 block w-full rounded-md bg-[#c8f31d] px-6 py-3 text-center text-xs font-bold uppercase tracking-wide text-black transition hover:brightness-95 sm:mt-8 sm:inline-block sm:w-auto 2xl:px-8 2xl:py-4 2xl:text-sm"
              >
              Browse Workouts
            </Link>
        </div>

        {/* Image */}
        <div className="shrink-0 md:mr-4 lg:mr-12 2xl:mr-24">
          <Image
            src={logo}
            alt="Muscle anatomy figure using a preacher curl machine"
            width={240}
            height={340}
            priority
            className="h-56 w-auto object-contain sm:h-72 md:h-64 lg:h-[340px] 2xl:h-[420px]"
          />
        </div>
      </div>
    </section>
  );
}
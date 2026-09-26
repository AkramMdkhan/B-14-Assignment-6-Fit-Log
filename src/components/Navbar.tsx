"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import logo from "@/assets/logo.png";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { planIds, savedIds } = usePlan();

  // Home and workout detail pages count as "Workouts"
  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  const desktopLink = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium transition lg:px-5 ${
      active
        ? "bg-[#18220d] text-[#b5ff00] hover:bg-[#202d11]"
        : "text-[#777b80] hover:text-white"
    }`;

  const mobileLink = (active: boolean) =>
    `rounded-xl px-4 py-3 text-sm font-medium ${
      active
        ? "bg-[#18220d] text-[#b5ff00]"
        : "text-[#777b80] hover:bg-[#151719] hover:text-white"
    }`;

  return (
    <>
      {/* Navbar */}
      <nav className="w-full border-b border-[#1b1d1f] bg-[#090a0b] sticky top-0">
        <div className="flex h-[88px] w-full items-center px-4 sm:px-6 lg:px-8">
          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 hover:bg-[#151719] md:hidden"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          {/* LEFT - LOGO */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Image
              src={logo}
              alt="Fitlog"
              className="h-8 w-8 object-contain sm:h-9 sm:w-9"
            />

            <span className="text-[18px] font-bold tracking-wide text-white sm:text-[20px]">
              FITLOG
            </span>
          </Link>

          {/* CENTER - DESKTOP NAVIGATION */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex lg:gap-2">
            <Link href="/" className={desktopLink(isWorkoutsActive)}>
              Workouts
            </Link>

            <Link href="/my-plan" className={desktopLink(isMyPlanActive)}>
              My Plan
            </Link>
          </div>

          {/* RIGHT */}
          <div className="ml-auto flex items-center gap-3 sm:gap-5 lg:gap-7">
            {/* PLAN */}
            <Link
              href="/my-plan"
              className="flex items-center gap-1.5 text-sm text-[#a0a3a7] transition hover:text-white sm:gap-2"
            >
              <span>Plan</span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b5ff00] px-1 text-[11px] font-bold text-black">
                {planIds.length}
              </span>
            </Link>

            {/* SAVED */}
            <Link
              href="/my-plan"
              className="flex items-center gap-1.5 text-sm text-[#777b80] transition hover:text-white sm:gap-2"
            >
              <span>Saved</span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#292c2f] px-1 text-[11px] text-[#777b80]">
                {savedIds.length}
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* MOBILE LEFT SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-[280px] border-r border-[#25282b] bg-[#090a0b] transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex h-[88px] items-center justify-between border-b border-[#1b1d1f] px-5">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3"
          >
            <Image
              src={logo}
              alt="Fitlog"
              className="h-8 w-8 object-contain"
            />

            <span className="text-[20px] font-bold tracking-wide text-white">
              FITLOG
            </span>
          </Link>

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-[#151719] hover:text-white"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* MOBILE LINKS */}
        <div className="flex flex-col gap-2 p-5">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={mobileLink(isWorkoutsActive)}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            onClick={() => setIsMenuOpen(false)}
            className={mobileLink(isMyPlanActive)}
          >
            My Plan
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
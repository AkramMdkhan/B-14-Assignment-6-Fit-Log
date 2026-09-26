import Image from "next/image";
import Link from "next/link";
import { Oswald } from "next/font/google";

import logo from "@/assets/logo.png";

const headingFont = Oswald({ subsets: ["latin"], weight: "700" });

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#1b1d1f] bg-[#090a0b]">
      <div className="flex min-h-[72px] w-full flex-col items-center justify-center gap-3 px-4 py-5 sm:px-6 md:flex-row md:justify-between lg:px-8">
        {/* LEFT - LOGO */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src={logo}
            alt="Fitlog"
            className="h-6 w-6 object-contain"
          />
          <span
            className={`${headingFont.className} text-sm font-bold uppercase tracking-wide text-white`}
          >
            FitLog
          </span>
        </Link>

        {/* RIGHT - COPYRIGHT */}
        <p className="text-center text-xs text-[#6b6f76] md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
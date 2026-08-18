"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "About", href: "/#hero" },
  { label: "Stories", href: "/stories" },
  { label: "Partners", href: "/#partners" },
];

type TopbarProps = { variant?: "light" | "dark" };

export default function Topbar({ variant = "light" }: TopbarProps) {
  const [open, setOpen] = useState(false);
  const isDark = variant === "dark";

  const linkColor = isDark
    ? "text-black hover:text-black focus:text-black"
    : "text-white hover:text-white focus:text-white";
  const barColor = isDark ? "bg-black" : "bg-white";
  const btnVariant = isDark ? "outlineDark" : "outline";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-nav-container">
      <div className="mx-auto flex h-20 w-full items-center justify-between px-5 md:px-10 lg:px-14">
        {/* Left — desktop nav */}
        <nav className="hidden flex-1 items-center gap-8 md:flex lg:gap-12">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-dm-sans text-xs font-normal md:text-sm ${linkColor}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Center — logo */}
        <Link href="/" className="shrink-0" aria-label="Unfiltered — home">
          <Image
            src={isDark ? "/assets/UnfilteredLogoDark.png" : "/assets/UnfilteredLogo.svg"}
            alt="Unfiltered by Lumigrapher"
            width={192}
            height={43}
            priority
            className="h-9 w-auto md:h-[43px]"
          />
        </Link>

        {/* Right — desktop CTAs */}
        <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
          <Button href="/#visit-info" variant={btnVariant} size="sm">
            Explore Now
          </Button>
          <Button href="/partners-form" variant={btnVariant} size="sm">
            Become a Partner
          </Button>
        </div>

        {/* Right — mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex flex-col items-end justify-center gap-[5px] p-2 md:hidden"
        >
          <span
            className={`block h-px transition-all duration-300 ${barColor} ${
              open ? "w-5 translate-y-[6px] rotate-45" : "w-5"
            }`}
          />
          <span
            className={`block h-px w-4 transition-all duration-300 ${barColor} ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-px transition-all duration-300 ${barColor} ${
              open ? "w-5 -translate-y-[6px] -rotate-45" : "w-3"
            }`}
          />
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 top-20 z-40 bg-black/95 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-6 px-6 pt-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-dm-sans text-lg text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <Button href="/#visit-info" variant="white" size="md" onClick={() => setOpen(false)}>
              Explore Now
            </Button>
            <Button
              href="/partners-form"
              variant="outline"
              size="md"
              onClick={() => setOpen(false)}
            >
              Become a Partner
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
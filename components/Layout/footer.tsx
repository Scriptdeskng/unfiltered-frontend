"use client";
import Image from "next/image";
import Link from "next/link";

const COLUMNS = [
  {
    title: "About",
    links: [
      { label: "The Story", href: "/stories" },
      { label: "Chapter One", href: "/#chapter-one" },
      { label: "Behind the Lens", href: "/behind-the-lens" },
      { label: "The Movement", href: "/movement" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Press Kit", href: "/press-kit" },
      { label: "Media Inquiries", href: "/contact?type=media" },
      { label: "Partnership Inquiries", href: "/contact?type=partnership" },
      { label: "General Inquiries", href: "/contact" },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "Instagram", href: "https://instagram.com", external: true },
      { label: "TikTok", href: "https://tiktok.com", external: true },
      { label: "Youtube", href: "https://youtube.com", external: true },
      { label: "X (Twitter)", href: "https://x.com", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-10 md:py-20 lg:px-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Image
              src="/assets/UnfilteredLogo.svg"
              alt="Unfiltered by Lumigrapher"
              width={240}
              height={54}
              className="h-12 w-auto md:h-14"
            />
            <p className="footer-gridtext mt-6 max-w-xs leading-relaxed">
              A photography and storytelling movement.
              <br />
              See beyond appearance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:justify-items-end">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="font-fraunces text-base font-semibold text-white md:text-lg">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        {...(("external" in link && link.external)
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="footer-gridtext transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-borders/20 pt-6 md:mt-16 md:flex-row md:items-center md:justify-between">
          <p className="footer-gridtext">
            © {new Date().getFullYear()} UNFILTERED · Lumigrapher
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="footer-gridtext transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-gridtext transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
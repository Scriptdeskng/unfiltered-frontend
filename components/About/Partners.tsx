import Image from "next/image";
import { Button } from "@/components/ui/Button";

const SUPPORTING = [
  { name: "Abeg", src: "/assets/partners/abeg.svg" },
  { name: "Backdrop", src: "/assets/partners/backdrop.svg" },
  { name: "Brimble", src: "/assets/partners/brimble.svg" },
  { name: "tix.africa", src: "/assets/partners/tix-africa.svg" },
  { name: "Zaron", src: "/assets/partners/zaron.svg" },
];

const MEDIA = [
  { name: "My Daily News Watch", src: "/assets/partners/daily-news.svg" },
  { name: "Punch", src: "/assets/partners/punch.svg" },
  { name: "Vanguard", src: "/assets/partners/vanguard.svg" },
  { name: "Co-creation HUB", src: "/assets/partners/cchub.svg" },
  { name: "The Guardian", src: "/assets/partners/guardian.svg" },
];

function LogoRow({ title, logos }: { title: string; logos: typeof SUPPORTING }) {
  return (
    <div className="w-full">
      <p className="sub-textblack">{title}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-8 md:gap-x-14">
        {logos.map((logo) => (
          <div key={logo.name} className="relative h-8 w-28 md:h-9 md:w-32">
            <Image
              src={logo.src}
              alt={logo.name}
              fill
              sizes="128px"
              className="object-contain object-left"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Partners() {
  return (
    <section id="partners"  className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-24 lg:px-14 lg:py-28">
        <div className="text-center">
          <h2 className="header mx-auto max-w-[22ch] text-balance">
            Built alongside people who believed in it first
          </h2>
          <p className="small-sub mx-auto mt-4 max-w-[56ch] text-pretty">
            UNFILTERED brings together partners committed to changing the way we
            see ourselves and one another.
          </p>
        </div>

        <div className="mt-12 space-y-12 md:mt-16 md:space-y-14">
          <LogoRow title="Supporting Partners" logos={SUPPORTING} />
          <LogoRow title="Media Partners" logos={MEDIA} />
        </div>

        <div className="mt-14 flex justify-center">
          <Button href="/partners-form" variant="black" size="md" className="w-[220px]">
            Become a Partner
          </Button>
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";
import Link from "next/link";

export default function BehindStories() {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-14 lg:py-28">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src="/assets/behind.svg"
            alt="A photographer shooting on location"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>

        <div>
          <h2 className="header text-balance">The people behind the stories</h2>

          <p className="small-sub mt-5 max-w-[44ch] text-pretty leading-relaxed">
            UNFILTERED is presented by Lumigrapher—a creative studio committed to
            using photography and visual storytelling to create meaningful
            cultural experiences
          </p>

          <Link
            href="/lumigrapher"
            className="mt-8 inline-flex items-center gap-2 border-b border-black pb-1 font-fraunces text-base text-black transition-opacity hover:opacity-70 md:text-lg"
          >
            Meet Lumigrapher <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";

const PORTRAITS = [
  { src: "/assets/spotted-heard.svg", alt: "Portrait against a pale grey backdrop" },
  { src: "/assets/vitiligo-known.svg", alt: "Portrait against a peach backdrop" },
  { src: "/assets/everyface.svg", alt: "Portrait against a soft blue backdrop" },
];

export default function EveryFace() {
  return (
    <section id="every-face" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-24 lg:px-14 lg:py-28">
        <div className="text-center">
          <h2 className="header text-balance">Every face has a story.</h2>
          <p className="small-sub mx-auto mt-4 max-w-[44ch] text-pretty">
            Stories of people learning to see themselves beyond the way the world
            sees them.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-14 md:gap-6 lg:grid-cols-3">
          {PORTRAITS.map((p) => (
            <div
              key={p.src}
              className="relative aspect-[3/4] w-full overflow-hidden"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
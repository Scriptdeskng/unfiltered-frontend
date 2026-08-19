import { Button } from "@/components/ui/Button";

const DETAILS = [
  { label: "Dates", value: "14–23 November 2026" },
  { label: "Venue", value: "The Terrace Gallery, Victoria Island" },
  { label: "Schedule", value: "11:00 – 20:00 Daily" },
  { label: "Accessibility", value: "Fully Accessible" },
];

const TICKETS = [
  {
    name: "General Admission",
    note: "Exhibition + Documentary",
    price: "₦5,000",
    priceColor: "#BA8809",
    border: false,
  },
  {
    name: "All-Access Pass",
    note: "+ Panels & Workshops",
    price: "₦12,000",
    priceColor: "#A49F51",
    border: false,
  },
  {
    name: "Group (5+)",
    note: "Per person, booked together",
    price: "₦4,000",
    priceColor: "#555D36",
    border: true,
  },
];

const CARD_BG = "linear-gradient(to right, #FFFFFF, #CECECE)";

const BORDER = {
  borderStyle: "solid",
  borderColor: "#00000026",
};

const BARS = [
  1, 3, 1, 1, 2, 4, 1, 2, 1, 3, 1, 1, 4, 2, 1, 1,
  3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 4, 1, 1, 2, 3, 1,
];

function Barcode() {
  return (
    <div
      aria-hidden="true"
      className="flex h-14 w-[26px] flex-col justify-center gap-[1px] sm:h-16 sm:w-[34px] md:h-28 md:w-[60px] md:gap-[2px]"
    >
      {BARS.map((h, i) => (
        <span
          key={i}
          style={{ height: `${h}px` }}
          className="block w-full shrink-0 bg-[#141414]"
        />
      ))}
    </div>
  );
}

export default function VisitInfo() {
  return (
    <section id="visit-info" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24 lg:px-10 lg:py-28">
        <div className="text-center">
          <h2 className="header text-balance">Everything you need to visit</h2>
          <p className="small-sub mx-auto mt-4 max-w-[54ch] text-pretty">
            Beyond the Skin comes to life through an immersive exhibition of
            photography, stories, film, and shared experiences
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Details */}
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
            {DETAILS.map((d) => (
              <div key={d.label} className="border-b border-black/15 pb-8">
                <p className="font-fraunces text-sm font-normal uppercase text-black md:text-base">
                  {d.label}
                </p>
                <p className="mt-3 font-dm-sans text-lg font-medium text-black md:text-xl lg:text-2xl">
                  {d.value}
                </p>
              </div>
            ))}
          </div>

         {/* Tickets */}
<div className="space-y-4 md:space-y-6">
  {TICKETS.map((t) => (
    <div
      key={t.name}
      className="relative flex items-center py-6 pl-4 pr-6 sm:pl-6 md:py-9 md:pl-8 md:pr-8"
      style={{
        backgroundImage: CARD_BG,
        ...(t.border && BORDER),
        maskImage:
          "radial-gradient(circle 8px at right, transparent 8px, black 8.5px)",
        maskSize: "100% 22px",
        maskRepeat: "repeat-y",
        WebkitMaskImage:
          "radial-gradient(circle 8px at right, transparent 8px, black 8.5px)",
        WebkitMaskSize: "100% 22px",
        WebkitMaskRepeat: "repeat-y",
      }}
    >
      {/* Name + note */}
      <div className="min-w-0 flex-1">
        <p className="font-fraunces text-base font-semibold text-black sm:text-lg md:text-2xl">
          {t.name}
        </p>
        <p className="mt-1.5 font-dm-sans text-xs text-[#2A2A2A] sm:text-sm md:text-base">
          {t.note}
        </p>
      </div>

      {/* Price */}
      <p
        className="shrink-0 px-3 font-fraunces text-base sm:text-lg md:px-6 md:text-2xl"
        style={{ color: t.priceColor }}
      >
        {t.price}
      </p>

      {/* Dashed perforation — inside the card */}
      <div
        aria-hidden="true"
        className="h-14 w-px shrink-0 bg-[repeating-linear-gradient(to_bottom,rgba(0,0,0,0.35)_0_4px,transparent_4px_9px)] sm:h-16 md:h-24"
      />

      {/* Barcode */}
      <div className="shrink-0 pl-3 md:pl-5">
        <Barcode />
      </div>
    </div>
  ))}
</div>
        </div>

        <div className="mt-14 flex justify-center">
          <Button href="/tickets" variant="black" size="md" className="w-[240px]">
            Get Tickets
          </Button>
        </div>
      </div>
    </section>
  );
}
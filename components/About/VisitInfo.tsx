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
      className="flex h-24 w-[52px] flex-col justify-center gap-[2px] md:h-28 md:w-[60px]"
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
    <section  id="visit-info" className="bg-white">
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
                <p className="font-fraunces font-normal text-sm md:text-base text-black uppercase">
                  {d.label}
                </p>
                <p className="mt-3 font-dm-sans font-medium text-lg text-black md:text-xl lg:text-2xl">
                  {d.value}
                </p>
              </div>
            ))}
          </div>

<div className="space-y-6">
  {TICKETS.map((t) => (
    <div key={t.name} className="flex flex-col sm:flex-row sm:items-stretch">
      {/* Main panel */}
      <div
        className="flex min-w-0 flex-1 items-center gap-4 px-5 py-6 sm:gap-6 md:px-8 md:py-9"
        style={{
          backgroundImage: CARD_BG,
          ...(t.border && BORDER),
        }}
      >
        <div className="min-w-0 flex-1">
          <p className="font-fraunces text-lg font-semibold text-black md:text-2xl">
            {t.name}
          </p>
          <p className="mt-1.5 font-dm-sans text-sm text-[#2A2A2A] md:text-base">
            {t.note}
          </p>
        </div>

        <p
          className="shrink-0 font-fraunces text-lg md:text-2xl"
          style={{ color: t.priceColor }}
        >
          {t.price}
        </p>
      </div>


      <div className="relative h-4 w-full shrink-0 sm:h-auto sm:w-4 md:w-5">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,rgba(0,0,0,0.3)_0_3px,transparent_3px_7px)] sm:left-0 sm:top-1/2 sm:h-px sm:w-full sm:-translate-x-0 sm:-translate-y-1/2 sm:bg-[repeating-linear-gradient(to_right,rgba(0,0,0,0.3)_0_3px,transparent_3px_7px)]"
        />
      </div>

      {/* Barcode stub */}
      <div
        className="relative flex shrink-0 items-center justify-center px-5 py-5 sm:justify-start sm:py-0 sm:pl-6 sm:pr-16 md:pr-20"
        style={{
          backgroundImage: CARD_BG,
          ...(t.border && BORDER),
          maskImage:
            "radial-gradient(circle 11px at right, transparent 11px, black 11.5px)",
          maskSize: "100% 30px",
          maskRepeat: "repeat-y",
          WebkitMaskImage:
            "radial-gradient(circle 11px at right, transparent 11px, black 11.5px)",
          WebkitMaskSize: "100% 30px",
          WebkitMaskRepeat: "repeat-y",
        }}
      >
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
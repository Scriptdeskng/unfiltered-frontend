import Image from "next/image";

const CHAPTERS = [
  {
    index: "001",
    label: "Seen",
    src: "/assets/cropped-seen.svg",
    alt: "Portrait with eyes closed against a pink backdrop",
    width: 1280,
    height: 880,
    widthClass: "w-[70%] md:w-[52%]",
    shift: "",
    pull: "",
    z: "z-[5]",
  },
  {
    index: "002",
    label: "Heard",
    src: "/assets/cropped-heard.svg",
    alt: "Close portrait against a pale blue backdrop",
    width: 1280,
    height: 960,
    widthClass: "w-[82%] md:w-[68%]",
    shift: "",
    pull: "",
    z: "z-[4]",
  },
  {
    index: "003",
    label: "Known",
    src: "/assets/cropped-known.svg",
    alt: "Portrait with hand at the collarbone against a peach backdrop",
    width: 1280,
    height: 720,
    widthClass: "w-[96%] md:w-[88%]",
    shift: "",
    pull: "",
    z: "z-[3]",
  },
  {
    index: "004",
    label: "Accepted",
    src: "/assets/cropped-accepted.svg",
    alt: "Motion-blurred red and amber abstract",
    width: 1280,
    height: 800,
    widthClass: "w-[80%] md:w-[66%]",
    shift: "",
    pull: "",
    z: "z-[2]",
  },
  {
    index: "005",
    label: "Beyond",
    src: "/assets/cropped-beyond.svg",
    alt: "A visitor alone in a white gallery space",
    width: 1280,
    height: 960,
    widthClass: "w-[62%] md:w-[48%]",
    shift: "",
    pull: "",
    z: "z-[1]",
  },
];

export default function ChapterOne() {
  return (
    <section id="chapter-one" className="overflow-hidden bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-24 lg:px-14 lg:py-28">
        <div className="text-center">
          <h2 className="header text-balance">Chapter One: Beyond the Skin</h2>
          <p className="small-sub mx-auto mt-4 max-w-[52ch] text-pretty">
            A powerful exploration of identity, confidence, and the stories
            carried beneath our skin.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[900px] md:mt-16">
          {CHAPTERS.map((item) => (
            <div
              key={item.index}
              className={`relative grid grid-cols-1 items-center md:grid-cols-[4.5rem_1fr_5.5rem] ${item.pull} ${item.z}`}
            >
              <span className="hidden self-center font-fraunces text-base text-black md:block">
                ({item.index})
              </span>

              <div className="flex justify-center">
                <div className={`${item.widthClass} ${item.shift}`}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className="h-auto w-full"
                  />
                </div>
              </div>

              <span className="hidden self-center text-right font-fraunces text-base tracking-[0.12em] text-black uppercase md:block">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
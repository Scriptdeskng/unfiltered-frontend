import Image from "next/image";

export default function SeeBeyond() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 text-center md:px-10 md:py-24 lg:px-14 lg:py-28">
        <h2 className="header text-balance">See Beyond Appearance</h2>

        <p className="small-sub mx-auto mt-5 max-w-[62ch] text-pretty leading-relaxed md:mt-6">
          UNFILTERED is an annual photography and storytelling movement exploring
          identity, confidence, and authentic beauty through immersive
          exhibitions, documentary storytelling, and community engagement.
        </p>

       <div className="relative mx-auto mt-10 aspect-[4/4.5] w-full max-w-[560px] overflow-hidden sm:aspect-[4/4] md:mt-12 lg:aspect-[4/4.3]">
  <Image
    src="/assets/aboutSee.svg"
    alt="Portrait from the UNFILTERED series"
    fill
    sizes="(min-width: 1024px) 560px, 100vw"
    className="object-cover object-[center_20%] lg:object-[center_30%]"
  />
        </div>

        <p className="img-undertext mx-auto mt-8 max-w-[70ch] text-pretty text-sm leading-relaxed md:mt-10 md:text-base lg:text-lg">
          Through photography, film, conversations, and community experiences, we
          invite people to look beyond what they see and connect through empathy
          and shared humanity
        </p>
      </div>
    </section>
  );
}
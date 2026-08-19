import Image from "next/image";

export default function What() {
  return (
    <section className="w-full bg-[#F5F5F5]">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
        <div className="w-full max-w-[520px] lg:max-w-none">
          <Image
            src="/assets/whatImg.svg"
            alt="Portrait from the Beyond the Skin series"
            width={1000}
            height={1250}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full"
          />
        </div>

        <div className="px-6 pb-12 md:px-10 lg:pb-24 lg:pr-14 lg:pl-0">
          <h2 className="img-headtext text-balance">
            What you see is only the beginning.
          </h2>

          <p className="img-subtext mt-4 text-pretty">
            We are more than the things people notice first.
          </p>

          <p className="small-sub mt-6 max-w-[44ch] text-pretty leading-relaxed">
            Beyond the Skin invites us to look closer—to explore the identities,
            experiences, insecurities, confidence, and stories that exist beneath
            appearance.
          </p>
        </div>
      </div>
    </section>
  );
}
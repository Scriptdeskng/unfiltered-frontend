import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function BePart() {
  return (
    <section className="relative w-full overflow-hidden rounded-3xl bg-white mb-14">
      <Image
        src="/assets/be-Part.svg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/25" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[420px] flex-col items-center justify-center px-6 py-20 text-center md:min-h-[520px] md:px-10 md:py-28 lg:min-h-[640px]">
        <h2 className="hero-text">Be part of the story.</h2>

        <p className="sub-text mx-auto mt-5 max-w-[62ch] text-pretty md:mt-6">
          Beyond the Skin is only Chapter One. What you do next writes Chapter
          Two. Whether you want to share your story, support the movement,
          collaborate, or simply experience UNFILTERED—we&apos;d love to have you
          with us
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:mt-10 md:gap-4">
          <Button href="/tickets" variant="outline" size="md" className="w-[200px]">
            Get Ticket
          </Button>
          <Button href="/partners-form" variant="outline" size="md" className="w-[200px]">
            Become a Partner
          </Button>
        </div>
      </div>
    </section>
  );
}
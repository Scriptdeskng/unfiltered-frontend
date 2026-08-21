import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden">
      <div className="relative min-h-[560px] w-full md:hidden">
        <Image
          src="/assets/heroImg.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div className="relative z-10 flex flex-col items-center px-6 pt-28 text-center">
          <HeroContent />
        </div>
      </div>

      <div className="relative hidden md:block">
        <Image
          src="/assets/heroImg.svg"
          alt=""
          width={1920}
          height={1280}
          priority
          sizes="100vw"
          className="h-auto w-full"
        />
        <div className="absolute inset-x-0 top-[14%] z-10 flex flex-col items-center px-10 text-center lg:px-14">
          <HeroContent />
        </div>
      </div>
    </section>
  );
}

function HeroContent() {
  return (
    <>
      <h1 className="hero-text max-w-[23.2ch] text-center tracking-normal lg:pt-25">
        Beyond the Skin: A Photography &amp; Storytelling Experience
      </h1>

      <p className="sub-text mt-2 max-w-[45ch] text-pretty md:mt-6">
        Challenging perception through powerful human stories that celebrate
        authenticity, confidence, and beauty beyond appearance
      </p>

      <Button
        href="/tickets"
        variant="white"
        size="lg"
        className="mt-2 w-[200px] md:mt-8 md:w-[240px]"
      >
        RSVP Now
      </Button>
    </>
  );
}
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function BePart() {
  return (
    <section className="mb-20 w-full bg-white">
      <div className="relative min-h-[480px] w-full overflow-hidden rounded-[34px] sm:hidden">
        <Image
          src="/assets/bepart.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex min-h-[480px] flex-col items-center justify-center px-5 text-center">
          <Content />
        </div>
      </div>

      {/* Tablet & up — natural image height, content overlaid */}
      <div className="relative hidden w-full overflow-hidden rounded-[34px] sm:block md:rounded-[50px]">
        <Image
          src="/assets/Bepart .PNG"
          alt=""
          width={1920}
          height={1080}
          sizes="100vw"
          className="h-auto w-full"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center md:px-12">
          <Content />
        </div>
      </div>
    </section>
  );
}

function Content() {
  return (
    <>
      <h2 className="hero-text">Be part of the story.</h2>

      <p className="sub-text mx-auto mt-4 max-w-[62ch] text-pretty md:mt-5">
        Beyond the Skin is only Chapter One. What you do next writes Chapter Two.
        Whether you want to share your story, support the movement, collaborate,
        or simply experience UNFILTERED — we&apos;d love to have you with us
      </p>

      <div className="mt-6 flex w-full flex-col items-center gap-3 sm:mt-6 sm:w-auto sm:flex-row md:mt-8 md:gap-4">
        <Button
          href="/tickets"
          variant="outline"
          size="sm"
          className="w-full max-w-[240px] sm:w-[160px]"
        >
          Get Ticket
        </Button>
        <Button
          href="/partners-form"
          variant="outline"
          size="sm"
          className="w-full max-w-[240px] sm:w-[180px]"
        >
          Become a Partner
        </Button>
      </div>
    </>
  );
}
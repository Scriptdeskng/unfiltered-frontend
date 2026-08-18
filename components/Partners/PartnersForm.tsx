"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const PARTNERSHIP_TYPES = [
  "Supporting Partner",
  "Media Partner",
  "Venue Partner",
  "Sponsorship",
  "Other",
];

const fieldBase =
  "w-full border border-[1.5px] border-[#616161]/20 rounded-md px-4 py-3 " +
  "font-dm-sans text-base text-black outline-none transition-colors " +
  "placeholder:text-black/35 focus:border-black/30 focus:border-[1.5px] md:text-lg";

const labelBase =
  "block font-special-elite text-sm tracking-[0.06em] text-[#474B57] uppercase md:text-base";

export default function PartnerForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    organisation: "",
    workEmail: "",
    phone: "",
    partnershipType: "",
    interest: "",
  });

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = () => {
    console.log(form);
  };

  return (
    <section className="bg-background mt-10">
      <div className="mx-auto max-w-[1440px] px-6 pb-20 md:px-8 md:pb-24 lg:px-10 lg:pb-28">
        <div className="grid gap-x-12 gap-y-6 md:grid-cols-2 md:gap-x-16 lg:gap-x-20">
          {/* First name */}
          <div>
            <label htmlFor="firstName" className={labelBase}>
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={form.firstName}
              onChange={update("firstName")}
              className={`${fieldBase} mt-3`}
            />
          </div>

          {/* Last name */}
          <div>
            <label htmlFor="lastName" className={labelBase}>
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={form.lastName}
              onChange={update("lastName")}
              className={`${fieldBase} mt-3`}
            />
          </div>

          {/* Organisation */}
          <div>
            <label htmlFor="organisation" className={labelBase}>
              Organisation
            </label>
            <input
              id="organisation"
              type="text"
              value={form.organisation}
              onChange={update("organisation")}
              className={`${fieldBase} mt-3`}
            />
          </div>

          {/* Work email */}
          <div>
            <label htmlFor="workEmail" className={labelBase}>
              Work Email
            </label>
            <input
              id="workEmail"
              type="email"
              value={form.workEmail}
              onChange={update("workEmail")}
              className={`${fieldBase} mt-3`}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className={labelBase}>
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={update("phone")}
              className={`${fieldBase} mt-3`}
            />
          </div>

          {/* Partnership type */}
          <div>
            <label htmlFor="partnershipType" className={labelBase}>
              Partnership Type
            </label>
            <div className="relative mt-3">
              <select
                id="partnershipType"
                value={form.partnershipType}
                onChange={update("partnershipType")}
                className={`${fieldBase} cursor-pointer appearance-none pr-10 ${
                  form.partnershipType ? "text-black" : "text-black/45"
                }`}
              >
                <option value="">Select an option</option>
                {PARTNERSHIP_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-black/50"
              >
                ▾
              </span>
            </div>
          </div>

          {/* Interest — full width */}
          <div className="md:col-span-2">
            <label htmlFor="interest" className={labelBase}>
              Tell Us About Your Interest
            </label>
            <textarea
              id="interest"
              rows={8}
              value={form.interest}
              onChange={update("interest")}
              className={`${fieldBase} mt-3 resize-none`}
            />
          </div>
        </div>

        <div className="mt-12 flex justify-center md:mt-14">
          <Button
            variant="black"
            size="md"
            className="w-[220px]"
            onClick={handleSubmit}
          >
            Submit Enquiry
          </Button>
        </div>
      </div>
    </section>
  );
}
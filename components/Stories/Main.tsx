"use client";

import { useState } from "react";
import PageHeader from "@/components/Common/PageHeader";
import GalleryGrid from "@/components/Common/GalleryGrid";
import BePart from "@/components/About/BePart";
import { TAB_ROWS } from "@/components/Common/galerryData";

const TABS = [
  { label: "All", value: "all" },
  { label: "Exhibition", value: "exhibition" },
  { label: "Portraits", value: "portraits" },
  { label: "BTS", value: "bts" },
  { label: "Events", value: "events" },
];

export default function Main() {
  const [tab, setTab] = useState("all");

  return (
    <>
      <PageHeader
        title="The Gallery"
        subtitle="A visual archive of UNFILTERED — the people, places, moments, and stories that bring each chapter to life"
        tabs={TABS}
        activeTab={tab}
        onTabChange={setTab}
      />

      <section className="bg-[#F5F5F5]">
        <div className="mx-auto max-w-[1440px] px-6 pb-20 md:px-8 md:pb-24 lg:px-10 lg:pb-28">
          <GalleryGrid rows={TAB_ROWS[tab] ?? TAB_ROWS.all} />
        </div>
      </section>

      <BePart />
    </>
  );
}
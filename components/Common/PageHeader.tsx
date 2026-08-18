"use client";

import { useState } from "react";

type Tab = { label: string; value: string };

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  tabs?: Tab[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
};

export default function PageHeader({
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange,
}: PageHeaderProps) {
  const [internal, setInternal] = useState(tabs?.[0]?.value ?? "");
  const current = activeTab ?? internal;

  const handleChange = (value: string) => {
    if (onTabChange) onTabChange(value);
    else setInternal(value);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-6 pt-32 md:px-8 md:pt-36 lg:px-10 lg:pt-40">
      <h1 className="header text-balance">{title}</h1>

      {subtitle && (
        <p className="sub-textblack mt-4 max-w-[58ch] text-pretty">{subtitle}</p>
      )}

      {tabs && tabs.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2 md:mt-10 md:gap-3">
          {tabs.map((tab) => {
            const isActive = tab.value === current;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => handleChange(tab.value)}
                aria-pressed={isActive}
                className={`rounded-full px-6 py-2.5 font-dm-sans text-sm transition-colors md:px-7 md:py-3 md:text-base ${
                  isActive
                    ? "bg-tabs-btn text-white"
                    : "border border-black/15 text-[#4C4C4C] hover:border-black/30 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
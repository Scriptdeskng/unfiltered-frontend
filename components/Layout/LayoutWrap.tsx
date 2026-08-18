import type { ReactNode } from "react";
import Topbar from "./topbar";
import Footer from "./footer";

type LayoutWrapProps = {
  children: ReactNode;
  hasHero?: boolean;
  topbarVariant?: "light" | "dark";
};

export default function LayoutWrap({
  children,
  hasHero = true,
  topbarVariant = "light",
}: LayoutWrapProps) {
  return (
    <>
      <Topbar variant={topbarVariant} />
      <main className={`flex-1 ${hasHero ? "" : "pt-20"}`}>{children}</main>
      <Footer />
    </>
  );
}
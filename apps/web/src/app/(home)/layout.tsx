import * as React from "react";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-str-ink text-fd-foreground">
      {/* Page panel with rounded bottom corners sitting on the dark footer */}
      <div className="relative z-10 flex flex-1 flex-col rounded-b-[2rem] bg-fd-background sm:rounded-b-[3rem]">
        <LandingNavbar />
        <main className="flex-1">{children}</main>
      </div>
      <LandingFooter />
    </div>
  );
}

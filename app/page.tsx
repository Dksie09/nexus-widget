"use client";

import { DepositDialog } from "@/components/deposit/DepositDialog";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ThemeBackground } from "@/components/ThemeBackground";

export default function Home() {
  return (
    <>
      <ThemeBackground />
      <div className="flex min-h-screen flex-col items-center justify-center font-sans gap-8">
        <div className="absolute top-8">
          <ThemeToggle />
        </div>
        <DepositDialog triggerText="Deposit" />
      </div>
    </>
  );
}

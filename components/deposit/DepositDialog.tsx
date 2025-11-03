"use client";

import { useState } from "react";
import { NeumorphicDialog } from "@/components/ui/NeumorphicDialog";
import {
  NeumorphicTabs,
  NeumorphicTabPanels,
} from "@/components/ui/NeumorphicTabs";
import { WalletTab } from "./WalletTab";
import { TransferTab } from "./TransferTab";
import { FiatTab } from "./FiatTab";

type TabType = "wallet" | "transfer" | "fiat";

const tabs: { id: TabType; label: string }[] = [
  { id: "wallet", label: "Wallet" },
  { id: "transfer", label: "Transfer QR" },
  { id: "fiat", label: "Fiat" },
];

interface DepositDialogProps {
  triggerText?: string;
}

export function DepositDialog({ triggerText = "Deposit" }: DepositDialogProps) {
  const [activeTab, setActiveTab] = useState<TabType>("wallet");
  const [formState, setFormState] = useState<"idle" | "loading">("idle");

  const handleSubmit = () => {
    setFormState("loading");
    setTimeout(() => {
      setFormState("idle");
    }, 1500);
  };

  return (
    <NeumorphicDialog triggerText={triggerText} title="Deposit">
      <NeumorphicTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as TabType)}
      />

      <NeumorphicTabPanels activeKey={activeTab}>
        {activeTab === "wallet" && (
          <WalletTab onSubmit={handleSubmit} formState={formState} />
        )}
        {activeTab === "transfer" && (
          <TransferTab onSubmit={handleSubmit} formState={formState} />
        )}
        {activeTab === "fiat" && (
          <FiatTab onSubmit={handleSubmit} formState={formState} />
        )}
      </NeumorphicTabPanels>
    </NeumorphicDialog>
  );
}

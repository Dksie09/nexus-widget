"use client";

import { useState } from "react";
import { NeumorphicInput } from "@/components/ui/NeumorphicInput";
import { NeumorphicSelect } from "@/components/ui/NeumorphicSelect";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";
import { TransactionStats } from "@/components/ui/TransactionStats";

type CurrencyType = "USD" | "INR" | "EUR";

const currencyOptions: { value: CurrencyType; label: string }[] = [
  { value: "USD", label: "USD" },
  { value: "INR", label: "INR" },
  { value: "EUR", label: "EUR" },
];

interface FiatTabProps {
  onSubmit: () => void;
}

export function FiatTab({ onSubmit }: FiatTabProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType>("USD");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <NeumorphicInput
        type="number"
        placeholder="Enter amount..."
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        rightElement={
          <NeumorphicSelect
            options={currencyOptions}
            value={selectedCurrency}
            onChange={setSelectedCurrency}
            compact
          />
        }
      />

      <TransactionStats
        className="flex flex-col gap-4 rounded-2xl p-5"
        rows={[
          {
            label: "You spend",
            value: (
              <span className="text-gray-800 font-bold text-xl">
                ${amount || "0.00"}
              </span>
            ),
          },
          {
            label: "You receive",
            value: (
              <span className="text-gray-800 font-bold text-xl">
                {amount ? (parseFloat(amount) * 0.99275).toFixed(2) : "0.00"}{" "}
                <span className="text-sm font-normal text-gray-500">USDC</span>
              </span>
            ),
          },
          {
            label: "Total Fees",
            value: (
              <span className="text-gray-800 font-bold text-lg">
                ${amount ? (parseFloat(amount) * 0.00725).toFixed(2) : "0.00"}
              </span>
            ),
          },
        ]}
      />

      <NeumorphicButton type="submit" variant="primary">
        Confirm
      </NeumorphicButton>
    </form>
  );
}

"use client";

import { useState } from "react";
import { NeumorphicInput } from "@/components/ui/NeumorphicInput";
import { NeumorphicSelect } from "@/components/ui/NeumorphicSelect";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";
import { TransactionStats } from "@/components/ui/TransactionStats";
import { useTheme } from "@/contexts/ThemeContext";
import { getNeumorphicShadow } from "@/lib/theme";

type SourceAssetType = "customize" | "single";
type TokenType = "USDC" | "USDT" | "ETH";

const sourceAssetOptions: { value: SourceAssetType; label: string }[] = [
  { value: "customize", label: "Customise Source Assets (Use Any)" },
  { value: "single", label: "Single Source Asset" },
];

const tokenOptions: { value: TokenType; label: string }[] = [
  { value: "USDC", label: "USDC" },
  { value: "USDT", label: "USDT" },
  { value: "ETH", label: "ETH" },
];

const percentages = [25, 50, 75, 100];

interface WalletTabProps {
  onSubmit: () => void;
}

export function WalletTab({ onSubmit }: WalletTabProps) {
  const { themeConfig } = useTheme();
  const [selectedSourceAsset, setSelectedSourceAsset] =
    useState<SourceAssetType>("customize");
  const [selectedToken, setSelectedToken] = useState<TokenType>("USDC");
  const [selectedPercentage, setSelectedPercentage] = useState<number | null>(
    null
  );
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Source Assets Dropdown */}
      <NeumorphicSelect
        options={sourceAssetOptions}
        value={selectedSourceAsset}
        onChange={setSelectedSourceAsset}
      />

      {/* Amount Input with Token Selector */}
      <NeumorphicInput
        type="number"
        placeholder="Enter amount..."
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          setSelectedPercentage(null);
        }}
        required
        rightElement={
          <NeumorphicSelect
            options={tokenOptions}
            value={selectedToken}
            onChange={setSelectedToken}
            compact
          />
        }
      />

      {/* Percentage Selector */}
      <div className="flex gap-2">
        {percentages.map((percent) => (
          <button
            key={percent}
            type="button"
            onClick={() => {
              setSelectedPercentage(percent);
            }}
            className="flex-1 py-2 rounded-xl text-sm font-medium text-gray-700 transition-all duration-200"
            style={
              selectedPercentage === percent
                ? {
                    background: themeConfig.background,
                    boxShadow: getNeumorphicShadow(themeConfig),
                  }
                : {
                    background: "transparent",
                    color: "#9CA3AF",
                  }
            }
          >
            {percent}%
          </button>
        ))}
      </div>

      {/* Transaction Stats */}
      <TransactionStats
        className="flex flex-col gap-4 rounded-2xl p-5"
        rows={[
          {
            value: (
              <div className="flex flex-col">
                <span className="text-gray-800 font-bold text-xl">
                  ${amount || "0.00"}
                </span>
                <span className="text-gray-500 text-xs">
                  1 assets on 3 chains
                </span>
              </div>
            ),
            action: (
              <button
                type="button"
                className="text-gray-600 text-sm hover:text-gray-800 transition-colors"
              >
                View Sources
              </button>
            ),
          },
          {
            label: "You receive",
            value: (
              <div className="flex flex-col items-end">
                <span className="text-gray-800 font-bold text-xl">
                  {amount ? (parseFloat(amount) * 0.995).toFixed(2) : "0.00"}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    {selectedToken}
                  </span>
                </span>
                <span className="text-gray-500 text-xs">
                  on Hyperliquid Perps
                </span>
              </div>
            ),
          },
          {
            label: "Total Fees",
            value: (
              <span className="text-gray-800 font-bold text-lg">
                ${amount ? (parseFloat(amount) * 0.005).toFixed(2) : "0.00"}
              </span>
            ),
            action: (
              <button
                type="button"
                className="text-gray-600 text-xs hover:text-gray-800 transition-colors"
              >
                View Breakup
              </button>
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

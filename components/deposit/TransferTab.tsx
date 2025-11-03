"use client";

import { useState } from "react";
import { NeumorphicInput } from "@/components/ui/NeumorphicInput";
import { NeumorphicSelect } from "@/components/ui/NeumorphicSelect";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";
import { useTheme } from "@/contexts/ThemeContext";
import { getNeumorphicShadow } from "@/lib/theme";

type ChainType = "Arbitrium" | "Base" | "Sepolia";
type AssetType = "USDT" | "USDC" | "ETH";

const chainOptions: { value: ChainType; label: string }[] = [
  { value: "Arbitrium", label: "Arbitrium" },
  { value: "Base", label: "Base" },
  { value: "Sepolia", label: "Sepolia" },
];

const assetOptions: { value: AssetType; label: string }[] = [
  { value: "USDT", label: "USDT" },
  { value: "USDC", label: "USDC" },
  { value: "ETH", label: "ETH" },
];

interface TransferTabProps {
  onSubmit: () => void;
}

export function TransferTab({ onSubmit }: TransferTabProps) {
  const { themeConfig } = useTheme();
  const [selectedChain, setSelectedChain] = useState<ChainType>("Arbitrium");
  const [selectedAsset, setSelectedAsset] = useState<AssetType>("USDT");
  const [depositAddress] = useState(
    "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  );
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(depositAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex gap-3">
        <NeumorphicSelect
          options={chainOptions}
          value={selectedChain}
          onChange={setSelectedChain}
          className="flex-1"
        />
        <NeumorphicSelect
          options={assetOptions}
          value={selectedAsset}
          onChange={setSelectedAsset}
          className="flex-1"
        />
      </div>

      <div
        className="w-full aspect-square rounded-2xl flex items-center justify-center"
        style={{
          background: themeConfig.background,
          boxShadow: getNeumorphicShadow(themeConfig, "inset"),
        }}
      >
        <span className="text-gray-400 text-sm">QR Code</span>
      </div>

      <NeumorphicInput
        type="text"
        value={depositAddress}
        readOnly
        rightElement={
          <button
            type="button"
            onClick={handleCopyAddress}
            className="p-2 rounded-xl transition-all duration-200 group"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-all duration-200 text-gray-600 group-hover:text-white"
              style={{
                filter: "drop-shadow(0 0 0px rgba(255, 255, 255, 0))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter =
                  "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 16px rgba(255, 255, 255, 0.5))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter =
                  "drop-shadow(0 0 0px rgba(255, 255, 255, 0))";
              }}
            >
              {copied ? (
                <path
                  d="M13.5 4L6 11.5L2.5 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-500"
                />
              ) : (
                <>
                  <rect
                    x="5"
                    y="5"
                    width="9"
                    height="9"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M3 10.5V2.5C3 2.22386 3.22386 2 3.5 2H10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>
          </button>
        }
      />

      <NeumorphicButton type="submit" variant="primary">
        Confirm
      </NeumorphicButton>
    </form>
  );
}

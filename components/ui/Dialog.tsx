"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

interface NeumorphicFeedbackProps {
  buttonText?: string;
}

type TabType = "wallet" | "transfer" | "fiat";
type CurrencyType = "USD" | "INR" | "EUR";
type TokenType = "USDC" | "USDT" | "ETH";
type SourceAssetType = "customize" | "single";
type ChainType = "Arbitrium" | "Base" | "Sepolia";
type AssetType = "USDT" | "USDC" | "ETH";

const tabs: { id: TabType; label: string }[] = [
  { id: "wallet", label: "Wallet" },
  { id: "transfer", label: "Transfer QR" },
  { id: "fiat", label: "Fiat" },
];

const currencies: CurrencyType[] = ["USD", "INR", "EUR"];
const tokens: TokenType[] = ["USDC", "USDT", "ETH"];
const sourceAssets: { id: SourceAssetType; label: string }[] = [
  { id: "customize", label: "Customise Source Assets (Use Any)" },
  { id: "single", label: "Single Source Asset" },
];
const percentages = [25, 50, 75, 100];
const chains: ChainType[] = ["Arbitrium", "Base", "Sepolia"];
const assets: AssetType[] = ["USDT", "USDC", "ETH"];

export function NeumorphicFeedback({
  buttonText = "Deposit",
}: NeumorphicFeedbackProps) {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState<"idle" | "loading">("idle");
  const [feedback, setFeedback] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("wallet");
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType>("USD");
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<TokenType>("USDC");
  const [tokenDropdownOpen, setTokenDropdownOpen] = useState(false);
  const [selectedSourceAsset, setSelectedSourceAsset] =
    useState<SourceAssetType>("customize");
  const [sourceAssetDropdownOpen, setSourceAssetDropdownOpen] = useState(false);
  const [selectedPercentage, setSelectedPercentage] = useState<number | null>(
    null
  );
  const [walletAmount, setWalletAmount] = useState("");
  const [selectedChain, setSelectedChain] = useState<ChainType>("Arbitrium");
  const [chainDropdownOpen, setChainDropdownOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetType>("USDT");
  const [assetDropdownOpen, setAssetDropdownOpen] = useState(false);
  const [depositAddress] = useState(
    "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  );
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const tokenDropdownRef = useRef<HTMLDivElement>(null);
  const sourceAssetDropdownRef = useRef<HTMLDivElement>(null);
  const chainDropdownRef = useRef<HTMLDivElement>(null);
  const assetDropdownRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    setFormState("loading");
    // Simulate API call
    setTimeout(() => {
      setFormState("idle");
      setFeedback("");
    }, 1500);
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(depositAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (currencyDropdownOpen) {
          setCurrencyDropdownOpen(false);
        } else if (tokenDropdownOpen) {
          setTokenDropdownOpen(false);
        } else if (sourceAssetDropdownOpen) {
          setSourceAssetDropdownOpen(false);
        } else if (chainDropdownOpen) {
          setChainDropdownOpen(false);
        } else if (assetDropdownOpen) {
          setAssetDropdownOpen(false);
        } else {
          setOpen(false);
        }
      }

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "Enter" &&
        open &&
        formState === "idle"
      ) {
        handleSubmit();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        currencyDropdownRef.current &&
        !currencyDropdownRef.current.contains(event.target as Node)
      ) {
        setCurrencyDropdownOpen(false);
      }

      if (
        tokenDropdownRef.current &&
        !tokenDropdownRef.current.contains(event.target as Node)
      ) {
        setTokenDropdownOpen(false);
      }

      if (
        sourceAssetDropdownRef.current &&
        !sourceAssetDropdownRef.current.contains(event.target as Node)
      ) {
        setSourceAssetDropdownOpen(false);
      }

      if (
        chainDropdownRef.current &&
        !chainDropdownRef.current.contains(event.target as Node)
      ) {
        setChainDropdownOpen(false);
      }

      if (
        assetDropdownRef.current &&
        !assetDropdownRef.current.contains(event.target as Node)
      ) {
        setAssetDropdownOpen(false);
      }

      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    open,
    formState,
    currencyDropdownOpen,
    tokenDropdownOpen,
    sourceAssetDropdownOpen,
    chainDropdownOpen,
    assetDropdownOpen,
  ]);

  const handleOpenDialog = () => {
    setOpen(true);
    setFormState("idle");
    setFeedback("");
    setActiveTab("wallet");
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {!open && (
          <motion.button
            onClick={handleOpenDialog}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative w-32 h-16 rounded-3xl transition-all duration-300 hover:scale-105 active:scale-95 group"
            style={{
              background: "#F0F0F3",
              boxShadow: `
                -10px -10px 30px 0 #FFFFFF,
                10px 10px 30px 0 rgba(174, 174, 192, 0.4),
                inset -10px -10px 10px 0 rgba(174, 174, 192, 0.25),
                inset 10px 10px 10px 0 #FFFFFF
              `,
            }}
          >
            <div
              className="absolute inset-0 rounded-3xl transition-all duration-300 opacity-0 group-hover:opacity-100"
              style={{
                border: "2px solid rgba(255, 255, 255, 0.8)",
                boxShadow: `
                  inset 0 0 15px 0 rgba(255, 255, 255, 0.5),
                  0 0 20px 0 rgba(255, 255, 255, 0.3)
                `,
              }}
            />
            <motion.span className="relative z-10 text-gray-700 font-medium">
              {buttonText}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor: "rgba(240, 240, 243, 0.3)",
            }}
          >
            <motion.div
              ref={dialogRef}
              className="w-full max-w-md rounded-3xl p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                background: "#F0F0F3",
                boxShadow: `
                  -10px -10px 30px 0 #FFFFFF,
                  10px 10px 30px 0 rgba(174, 174, 192, 0.4)
                `,
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-6"
              >
                <motion.h2
                  className="text-2xl font-semibold text-gray-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Deposit
                </motion.h2>

                {/* Tab Menu */}
                <div
                  className="relative flex gap-2 p-2 rounded-2xl"
                  style={{
                    background: "#F0F0F3",
                    boxShadow: `
                      inset -5px -5px 10px 0 rgba(255, 255, 255, 0.5),
                      inset 5px 5px 10px 0 rgba(174, 174, 192, 0.3)
                    `,
                  }}
                >
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="relative flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-colors duration-200 z-10"
                      style={{
                        color: activeTab === tab.id ? "#9CA3AF" : "#9CA3AF",
                        textShadow:
                          activeTab === tab.id
                            ? `
                                0 0 10px rgba(174, 174, 192, 0.2),
                                0 0 20px rgba(174, 174, 192, 0.2)
                              `
                            : "none",
                      }}
                    >
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="tab-indicator"
                          className="absolute inset-0 rounded-xl"
                          style={{
                            background: "#F0F0F3",
                            boxShadow: `
                              -10px -10px 10px 0 rgba(255, 255, 255, 0.7),
                              10px 10px 10px 0 rgba(174, 174, 192, 0.2)
                            `,
                          }}
                          transition={{
                            duration: 0.2,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <TabContent
                  activeTab={activeTab}
                  feedback={feedback}
                  onFeedbackChange={setFeedback}
                  onSubmit={handleSubmit}
                  formState={formState}
                  selectedCurrency={selectedCurrency}
                  setSelectedCurrency={setSelectedCurrency}
                  currencyDropdownOpen={currencyDropdownOpen}
                  setCurrencyDropdownOpen={setCurrencyDropdownOpen}
                  currencyDropdownRef={currencyDropdownRef}
                  selectedToken={selectedToken}
                  setSelectedToken={setSelectedToken}
                  tokenDropdownOpen={tokenDropdownOpen}
                  setTokenDropdownOpen={setTokenDropdownOpen}
                  tokenDropdownRef={tokenDropdownRef}
                  selectedSourceAsset={selectedSourceAsset}
                  setSelectedSourceAsset={setSelectedSourceAsset}
                  sourceAssetDropdownOpen={sourceAssetDropdownOpen}
                  setSourceAssetDropdownOpen={setSourceAssetDropdownOpen}
                  sourceAssetDropdownRef={sourceAssetDropdownRef}
                  selectedPercentage={selectedPercentage}
                  setSelectedPercentage={setSelectedPercentage}
                  walletAmount={walletAmount}
                  setWalletAmount={setWalletAmount}
                  selectedChain={selectedChain}
                  setSelectedChain={setSelectedChain}
                  chainDropdownOpen={chainDropdownOpen}
                  setChainDropdownOpen={setChainDropdownOpen}
                  chainDropdownRef={chainDropdownRef}
                  selectedAsset={selectedAsset}
                  setSelectedAsset={setSelectedAsset}
                  assetDropdownOpen={assetDropdownOpen}
                  setAssetDropdownOpen={setAssetDropdownOpen}
                  assetDropdownRef={assetDropdownRef}
                  depositAddress={depositAddress}
                  copied={copied}
                  onCopyAddress={handleCopyAddress}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface TabContentProps {
  activeTab: TabType;
  feedback: string;
  onFeedbackChange: (value: string) => void;
  onSubmit: () => void;
  formState: "idle" | "loading";
  selectedCurrency: CurrencyType;
  setSelectedCurrency: (currency: CurrencyType) => void;
  currencyDropdownOpen: boolean;
  setCurrencyDropdownOpen: (open: boolean) => void;
  currencyDropdownRef: React.RefObject<HTMLDivElement | null>;
  selectedToken: TokenType;
  setSelectedToken: (token: TokenType) => void;
  tokenDropdownOpen: boolean;
  setTokenDropdownOpen: (open: boolean) => void;
  tokenDropdownRef: React.RefObject<HTMLDivElement | null>;
  selectedSourceAsset: SourceAssetType;
  setSelectedSourceAsset: (asset: SourceAssetType) => void;
  sourceAssetDropdownOpen: boolean;
  setSourceAssetDropdownOpen: (open: boolean) => void;
  sourceAssetDropdownRef: React.RefObject<HTMLDivElement | null>;
  selectedPercentage: number | null;
  setSelectedPercentage: (percentage: number | null) => void;
  walletAmount: string;
  setWalletAmount: (amount: string) => void;
  selectedChain: ChainType;
  setSelectedChain: (chain: ChainType) => void;
  chainDropdownOpen: boolean;
  setChainDropdownOpen: (open: boolean) => void;
  chainDropdownRef: React.RefObject<HTMLDivElement | null>;
  selectedAsset: AssetType;
  setSelectedAsset: (asset: AssetType) => void;
  assetDropdownOpen: boolean;
  setAssetDropdownOpen: (open: boolean) => void;
  assetDropdownRef: React.RefObject<HTMLDivElement | null>;
  depositAddress: string;
  copied: boolean;
  onCopyAddress: () => void;
}

function TabContent({
  activeTab,
  feedback,
  onFeedbackChange,
  onSubmit,
  formState,
  selectedCurrency,
  setSelectedCurrency,
  currencyDropdownOpen,
  setCurrencyDropdownOpen,
  currencyDropdownRef,
  selectedToken,
  setSelectedToken,
  tokenDropdownOpen,
  setTokenDropdownOpen,
  tokenDropdownRef,
  selectedSourceAsset,
  setSelectedSourceAsset,
  sourceAssetDropdownOpen,
  setSourceAssetDropdownOpen,
  sourceAssetDropdownRef,
  selectedPercentage,
  setSelectedPercentage,
  walletAmount,
  setWalletAmount,
  selectedChain,
  setSelectedChain,
  chainDropdownOpen,
  setChainDropdownOpen,
  chainDropdownRef,
  selectedAsset,
  setSelectedAsset,
  assetDropdownOpen,
  setAssetDropdownOpen,
  assetDropdownRef,
  depositAddress,
  copied,
  onCopyAddress,
}: TabContentProps) {
  return (
    <motion.form
      key={activeTab}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      onSubmit={(e) => {
        e.preventDefault();
        const hasValidInput =
          (activeTab === "wallet" && walletAmount) ||
          (activeTab === "fiat" && feedback) ||
          activeTab === "transfer";
        if (!hasValidInput) return;
        onSubmit();
      }}
      className="flex flex-col gap-6"
    >
      {activeTab === "wallet" && (
        <>
          {/* Source Assets Dropdown */}
          <div ref={sourceAssetDropdownRef} className="relative">
            <button
              type="button"
              onClick={() =>
                setSourceAssetDropdownOpen(!sourceAssetDropdownOpen)
              }
              className="w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 transition-all duration-200 hover:scale-[1.01] flex items-center justify-between"
              style={{
                background: "#F0F0F3",
                boxShadow: `
                  -5px -5px 10px 0 #FFFFFF,
                  5px 5px 10px 0 rgba(174, 174, 192, 0.4)
                `,
              }}
            >
              <span>
                {sourceAssets.find((a) => a.id === selectedSourceAsset)?.label}
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-200"
                style={{
                  transform: sourceAssetDropdownOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <AnimatePresence>
              {sourceAssetDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 mt-2 rounded-xl overflow-hidden z-10"
                  style={{
                    background: "#F0F0F3",
                    boxShadow: `
                      -5px -5px 15px 0 #FFFFFF,
                      5px 5px 15px 0 rgba(174, 174, 192, 0.4)
                    `,
                  }}
                >
                  {sourceAssets.map((asset) => (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => {
                        setSelectedSourceAsset(asset.id);
                        setSourceAssetDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100/50 transition-colors text-left"
                      style={{
                        background:
                          selectedSourceAsset === asset.id
                            ? "rgba(174, 174, 192, 0.1)"
                            : "transparent",
                      }}
                    >
                      {asset.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Amount Input with Token Selector */}
          <div className="relative">
            <input
              type="number"
              placeholder="Enter amount..."
              value={walletAmount}
              onChange={(e) => {
                setWalletAmount(e.target.value);
                setSelectedPercentage(null);
              }}
              required
              className="w-full rounded-2xl p-4 pr-24 text-gray-700 placeholder-gray-400 focus:outline-none transition-all"
              style={{
                background: "#F0F0F3",
                boxShadow: `
                  inset -5px -5px 10px 0 #FFFFFF,
                  inset 5px 5px 10px 0 rgba(174, 174, 192, 0.4)
                `,
              }}
            />

            {/* Token Dropdown */}
            <div
              ref={tokenDropdownRef}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <button
                type="button"
                onClick={() => setTokenDropdownOpen(!tokenDropdownOpen)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-gray-700 transition-all duration-200 hover:scale-105 flex items-center gap-1"
                style={{
                  background: "#F0F0F3",
                  boxShadow: `
                    -5px -5px 10px 0 #FFFFFF,
                    5px 5px 10px 0 rgba(174, 174, 192, 0.4)
                  `,
                }}
              >
                {selectedToken}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-200"
                  style={{
                    transform: tokenDropdownOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {tokenDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 rounded-xl overflow-hidden"
                    style={{
                      background: "#F0F0F3",
                      boxShadow: `
                        -5px -5px 15px 0 #FFFFFF,
                        5px 5px 15px 0 rgba(174, 174, 192, 0.4)
                      `,
                    }}
                  >
                    {tokens.map((token) => (
                      <button
                        key={token}
                        type="button"
                        onClick={() => {
                          setSelectedToken(token);
                          setTokenDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100/50 transition-colors text-left"
                        style={{
                          background:
                            selectedToken === token
                              ? "rgba(174, 174, 192, 0.1)"
                              : "transparent",
                        }}
                      >
                        {token}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Percentage Selector */}
          <div className="flex gap-2">
            {percentages.map((percent) => (
              <button
                key={percent}
                type="button"
                onClick={() => {
                  setSelectedPercentage(percent);
                  // You can set walletAmount based on some max balance * percent
                  // For now, just mark it as selected
                }}
                className="flex-1 py-2 rounded-xl text-sm font-medium text-gray-700 transition-all duration-200"
                style={
                  selectedPercentage === percent
                    ? {
                        background: "#F0F0F3",
                        boxShadow: `
                          -5px -5px 10px 0 #FFFFFF,
                          5px 5px 10px 0 rgba(174, 174, 192, 0.4)
                        `,
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4 rounded-2xl p-5"
            style={{
              background: "#F0F0F3",
              boxShadow: `
                inset -3px -3px 8px 0 rgba(255, 255, 255, 0.5),
                inset 3px 3px 8px 0 rgba(174, 174, 192, 0.2)
              `,
            }}
          >
            {/* You spend */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-gray-800 font-bold text-xl">
                  ${walletAmount || "0.00"}
                </span>
                <span className="text-gray-500 text-xs">
                  1 assets on 3 chains
                </span>
              </div>
              <button
                type="button"
                className="text-gray-600 text-sm hover:text-gray-800 transition-colors"
              >
                View Sources
              </button>
            </div>

            {/* Divider */}
            <div
              className="h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(174, 174, 192, 0.3), transparent)",
              }}
            />

            {/* You receive */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">You receive</span>
              <div className="flex flex-col items-end">
                <span className="text-gray-800 font-bold text-xl">
                  {walletAmount
                    ? (parseFloat(walletAmount) * 0.995).toFixed(2)
                    : "0.00"}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    {selectedToken}
                  </span>
                </span>
                <span className="text-gray-500 text-xs">
                  on Hyperliquid Perps
                </span>
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(174, 174, 192, 0.3), transparent)",
              }}
            />

            {/* Total Fees */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Total Fees</span>
              <div className="flex flex-col items-end">
                <span className="text-gray-800 font-bold text-lg">
                  $
                  {walletAmount
                    ? (parseFloat(walletAmount) * 0.005).toFixed(2)
                    : "0.00"}
                </span>
                <button
                  type="button"
                  className="text-gray-600 text-xs hover:text-gray-800 transition-colors"
                >
                  View Breakup
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {activeTab === "transfer" && (
        <>
          {/* Chain and Asset Selectors */}
          <div className="flex gap-3">
            {/* Chain Dropdown */}
            <div ref={chainDropdownRef} className="relative flex-1">
              <button
                type="button"
                onClick={() => setChainDropdownOpen(!chainDropdownOpen)}
                className="w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 transition-all duration-200 hover:scale-[1.01] flex items-center justify-between"
                style={{
                  background: "#F0F0F3",
                  boxShadow: `
                    -5px -5px 10px 0 #FFFFFF,
                    5px 5px 10px 0 rgba(174, 174, 192, 0.4)
                  `,
                }}
              >
                <span>{selectedChain}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-200"
                  style={{
                    transform: chainDropdownOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {chainDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 right-0 mt-2 rounded-xl overflow-hidden z-10"
                    style={{
                      background: "#F0F0F3",
                      boxShadow: `
                        -5px -5px 15px 0 #FFFFFF,
                        5px 5px 15px 0 rgba(174, 174, 192, 0.4)
                      `,
                    }}
                  >
                    {chains.map((chain) => (
                      <button
                        key={chain}
                        type="button"
                        onClick={() => {
                          setSelectedChain(chain);
                          setChainDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100/50 transition-colors text-left"
                        style={{
                          background:
                            selectedChain === chain
                              ? "rgba(174, 174, 192, 0.1)"
                              : "transparent",
                        }}
                      >
                        {chain}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Asset Dropdown */}
            <div ref={assetDropdownRef} className="relative flex-1">
              <button
                type="button"
                onClick={() => setAssetDropdownOpen(!assetDropdownOpen)}
                className="w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 transition-all duration-200 hover:scale-[1.01] flex items-center justify-between"
                style={{
                  background: "#F0F0F3",
                  boxShadow: `
                    -5px -5px 10px 0 #FFFFFF,
                    5px 5px 10px 0 rgba(174, 174, 192, 0.4)
                  `,
                }}
              >
                <span>{selectedAsset}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-200"
                  style={{
                    transform: assetDropdownOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {assetDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 right-0 mt-2 rounded-xl overflow-hidden z-10"
                    style={{
                      background: "#F0F0F3",
                      boxShadow: `
                        -5px -5px 15px 0 #FFFFFF,
                        5px 5px 15px 0 rgba(174, 174, 192, 0.4)
                      `,
                    }}
                  >
                    {assets.map((asset) => (
                      <button
                        key={asset}
                        type="button"
                        onClick={() => {
                          setSelectedAsset(asset);
                          setAssetDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100/50 transition-colors text-left"
                        style={{
                          background:
                            selectedAsset === asset
                              ? "rgba(174, 174, 192, 0.1)"
                              : "transparent",
                        }}
                      >
                        {asset}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* QR Code */}
          <div
            className="w-full aspect-square rounded-2xl flex items-center justify-center"
            style={{
              background: "#F0F0F3",
              boxShadow: `
                inset -5px -5px 10px 0 #FFFFFF,
                inset 5px 5px 10px 0 rgba(174, 174, 192, 0.4)
              `,
            }}
          >
            <span className="text-gray-400 text-sm">QR Code</span>
          </div>

          {/* Deposit Address Input */}
          <div className="relative">
            <input
              type="text"
              value={depositAddress}
              readOnly
              className="w-full rounded-2xl p-4 pr-12 text-gray-700 focus:outline-none transition-all"
              style={{
                background: "#F0F0F3",
                boxShadow: `
                  inset -5px -5px 10px 0 #FFFFFF,
                  inset 5px 5px 10px 0 rgba(174, 174, 192, 0.4)
                `,
              }}
            />

            {/* Copy Icon */}
            <button
              type="button"
              onClick={onCopyAddress}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-200 group"
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
          </div>
        </>
      )}

      {activeTab === "fiat" && (
        <>
          <div className="relative">
            <input
              type="number"
              placeholder="Enter amount..."
              value={feedback}
              onChange={(e) => onFeedbackChange(e.target.value)}
              required
              className="w-full rounded-2xl p-4 pr-24 text-gray-700 placeholder-gray-400 focus:outline-none transition-all"
              style={{
                background: "#F0F0F3",
                boxShadow: `
                  inset -5px -5px 10px 0 #FFFFFF,
                  inset 5px 5px 10px 0 rgba(174, 174, 192, 0.4)
                `,
              }}
            />

            {/* Currency Dropdown */}
            <div
              ref={currencyDropdownRef}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-gray-700 transition-all duration-200 hover:scale-105 flex items-center gap-1"
                style={{
                  background: "#F0F0F3",
                  boxShadow: `
                    -5px -5px 10px 0 #FFFFFF,
                    5px 5px 10px 0 rgba(174, 174, 192, 0.4)
                  `,
                }}
              >
                {selectedCurrency}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-200"
                  style={{
                    transform: currencyDropdownOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {currencyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 rounded-xl overflow-hidden"
                    style={{
                      background: "#F0F0F3",
                      boxShadow: `
                        -5px -5px 15px 0 #FFFFFF,
                        5px 5px 15px 0 rgba(174, 174, 192, 0.4)
                      `,
                    }}
                  >
                    {currencies.map((currency) => (
                      <button
                        key={currency}
                        type="button"
                        onClick={() => {
                          setSelectedCurrency(currency);
                          setCurrencyDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100/50 transition-colors text-left"
                        style={{
                          background:
                            selectedCurrency === currency
                              ? "rgba(174, 174, 192, 0.1)"
                              : "transparent",
                        }}
                      >
                        {currency}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Transaction Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4 rounded-2xl p-5"
            style={{
              background: "#F0F0F3",
              boxShadow: `
                inset -3px -3px 8px 0 rgba(255, 255, 255, 0.5),
                inset 3px 3px 8px 0 rgba(174, 174, 192, 0.2)
              `,
            }}
          >
            {/* You spend */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">You spend</span>
              <span className="text-gray-800 font-bold text-xl">
                ${feedback || "0.00"}
              </span>
            </div>

            {/* Divider */}
            <div
              className="h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(174, 174, 192, 0.3), transparent)",
              }}
            />

            {/* You receive */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">You receive</span>
              <span className="text-gray-800 font-bold text-xl">
                {feedback
                  ? (parseFloat(feedback) * 0.99275).toFixed(2)
                  : "0.00"}{" "}
                <span className="text-sm font-normal text-gray-500">USDC</span>
              </span>
            </div>

            {/* Divider */}
            <div
              className="h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(174, 174, 192, 0.3), transparent)",
              }}
            />

            {/* Total Fees */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Total Fees</span>
              <span className="text-gray-800 font-bold text-lg">
                $
                {feedback
                  ? (parseFloat(feedback) * 0.00725).toFixed(2)
                  : "0.00"}
              </span>
            </div>
          </motion.div>
        </>
      )}

      <button
        type="submit"
        disabled={formState === "loading"}
        className="relative h-12 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        style={{
          background: "#F0F0F3",
          boxShadow: `
            -5px -5px 15px 0 #FFFFFF,
            5px 5px 15px 0 rgba(174, 174, 192, 0.4),
            inset -5px -5px 10px 0 rgba(174, 174, 192, 0.25),
            inset 5px 5px 10px 0 #FFFFFF
          `,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={formState}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center text-gray-700 font-medium"
          >
            {formState === "loading" ? (
              <motion.div
                className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ) : (
              "Confirm"
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    </motion.form>
  );
}

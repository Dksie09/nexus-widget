"use client";

interface NeumorphicCommandButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export function NeumorphicCommandButton({
  children,
  onClick,
}: NeumorphicCommandButtonProps) {
  return (
    <button
      onClick={onClick}
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
      ></div>
      <span className="relative z-10 text-gray-700">{children}</span>
    </button>
  );
}

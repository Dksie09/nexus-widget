import { NeumorphicCommandButton } from "@/components/ui/Button";
import { NeumorphicFeedback } from "@/components/ui/Dialog";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      {/* <NeumorphicCommandButton>Deposit</NeumorphicCommandButton> */}
      <NeumorphicFeedback buttonText="Deposit" />
    </div>
  );
}

import { DepositDialog } from "@/components/deposit/DepositDialog";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <DepositDialog triggerText="Deposit" />
    </div>
  );
}

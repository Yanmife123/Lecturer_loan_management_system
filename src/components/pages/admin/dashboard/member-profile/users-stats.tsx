import { StatCard } from "@/components/pages/dashboard/statsCard";
import { FileText, LayoutGrid, Wallet2, Users, TrendingUp } from "lucide-react";
export function MemberStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard label="Total Members" value="1,234" icon={Users} />
      <StatCard label="Active Members" value="987" icon={TrendingUp} />
      <StatCard label="Pending Applications" value="45" icon={FileText} />
      <StatCard label="Member Lifetime" value="2.5 years" icon={LayoutGrid} />
    </div>
  );
}

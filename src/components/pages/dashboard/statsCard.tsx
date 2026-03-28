import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type IconVariant = "default" | "blue" | "yellow" | "ghost";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  iconVariant?: IconVariant;
}

interface StatCardData {
  icon: LucideIcon;
  value: string;
  label: string;
  iconVariant?: IconVariant;
}

const iconVariantStyles: Record<
  IconVariant,
  { wrapper: string; icon: string }
> = {
  default: {
    wrapper: "bg-transparent",
    icon: "text-primaryT",
  },
  blue: {
    wrapper: "bg-[#1B2E5E1A] ",
    icon: "text-[#1B2E5E]",
  },
  yellow: {
    wrapper: "bg-[#C89B2A1A] ",
    icon: "text-[#C89B2A]",
  },
  ghost: {
    wrapper: "bg-transparent",
    icon: "text-muted-foreground",
  },
};

export function StatCard({
  icon: Icon,
  value,
  label,
  iconVariant = "default",
}: StatCardProps) {
  const styles = iconVariantStyles[iconVariant];

  return (
    <Card className="flex-1 min-w-37.5 shadow-none border border-border rounded-2xl font-sans">
      <CardContent className="flex flex-col gap-3 p-5">
        {/* Icon */}
        <div
          className={` ${styles.wrapper} h-12 w-12 flex justify-center items-center rounded-[12px] `}
        >
          <Icon size={24} className={styles.icon} strokeWidth={1.5} />
        </div>

        <div>
          {/* Value */}
          <p className="text-2xl font-normal text-[#1B2E5E]  leading-8">
            {value}
          </p>

          {/* Label */}
          <p className="text-sm text-[#64748B] leading-5">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

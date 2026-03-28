import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Wallet } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "savings" | "loan-payment" | "loan-disbursement";
  title: string;
  date: string;
  amount: string;
  isPositive: boolean;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const defaultActivities: ActivityItem[] = [
    {
      id: "1",
      type: "savings",
      title: "Savings",
      date: "Mar 16 2026",
      amount: "+₦50,000",
      isPositive: true,
    },
    {
      id: "2",
      type: "loan-payment",
      title: "Loan Repayment",
      date: "Feb 28 2026",
      amount: "-₦45,000",
      isPositive: false,
    },
    {
      id: "3",
      type: "loan-disbursement",
      title: "Loan Disbursement",
      date: "Jan 10 2026",
      amount: "+₦600,000",
      isPositive: true,
    },
  ];

  const displayActivities = activities || defaultActivities;

  const getIcon = (type: string) => {
    switch (type) {
      case "savings":
        return <Wallet className="w-5 h-5" />;
      case "loan-payment":
        return <ArrowDown className="w-5 h-5" />;
      case "loan-disbursement":
        return <ArrowUp className="w-5 h-5" />;
      default:
        return <Wallet className="w-5 h-5" />;
    }
  };

  return (
    <Card className="w-full font-sans">
      <div className="p-4 md:p-6">
        <h2 className="text-lg font-medium mb-4 md:mb-6 text-primaryT">
          Recent Activity
        </h2>

        <div className="space-y-3 md:space-y-2">
          {displayActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between  py-3 md:py-4 border-b-2 border-[#1B2E5E1A] "
            >
              {/* Left Section - Icon and Details */}
              <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <div
                  className={`flex-shrink-0 p-2 rounded-full ${
                    activity.isPositive
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {getIcon(activity.type)}
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <p className="text-sm md:text-base font-medium text-primaryT truncate leading-5">
                    {activity.title}
                  </p>
                  <p className="text-xs md:text-sm text-[#64748B] leading-4">
                    {activity.date}
                  </p>
                </div>
              </div>

              {/* Right Section - Amount */}
              <div className="ml-2 flex-shrink-0">
                <p
                  className={`text-sm md:text-base font-normal leaing-5 whitespace-nowrap ${
                    activity.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {activity.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

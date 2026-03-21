import { Card } from "@/components/ui/card";
import { Users, TrendingUp, Calendar, Badge } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Total Members",
    value: "450+",
    icon: Users,
    color: "#C89B2A",
    bgColor: "#C89B2A1A",
  },
  {
    id: 2,
    title: "Loans Discharged",
    value: "₦125M",
    icon: TrendingUp,
    color: "#1B2E5E",
    bgColor: "#1B2E5E1A",
  },
  {
    id: 3,
    title: "Years Operating",
    value: "12",
    icon: Calendar,
    color: "#1B2E5E",
    bgColor: "",
  },
  {
    id: 4,
    title: "Loan Types",
    value: "5",
    icon: Badge,
    color: "#EF4444",
    bgColor: "#EF44441A",
  },
];

export default function AboutUs() {
  return (
    <div className="font-sans py-18 px-4 md:px-8" id="about">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-primaryT md:text-4xl text-2xl font-medium leading-10 ">
            About Our Cooperative
          </h2>
          <p className="text-[#64748B] leading-6">
            The Redeemer's University Staff Cooperative Multipurpose Society Ltd
            was established to provide financial support and empowerment to all
            staff members. Our mission is to foster economic growth through
            accessible loan services, transparent operations, and member-focused
            benefits.
          </p>
          <p className="text-[#64748B] leading-6 ">
            The Redeemer's University Staff Cooperative Multipurpose Society Ltd
            was established to provide financial support and empowerment to all
            staff members. Our mission is to foster economic growth through
            accessible loan services, transparent operations, and member-focused
            benefits.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat) => (
            <Card key={stat.id} className="border-[#1B2E5E1A] md:px-6 p-4 ">
              <div>
                <div
                  className="py-3 px-3 w-fit rounded-[12px]"
                  style={{ background: stat.bgColor }}
                >
                  <stat.icon color={stat.color} size={24} />
                </div>
              </div>
              <div>
                <div className="md:text-3xl text-xl leading-9 text-primaryT">
                  {stat.value}
                </div>
                <p className="text-[#64748B] md:text-sm text-xs  leading-5">
                  {stat.title}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

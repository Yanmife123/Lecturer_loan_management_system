import { format } from "date-fns";

type DateFormat =
  | "full" // April 16, 2018
  | "short" // 16/04/2018
  | "month-year" // April 2018
  | "month-day" // April 16
  | "with-time" // Apr 16, 2026 • 4:20 PM
  | "abbreviated"; // 16 Apr 2018

const formatMap: Record<DateFormat, string> = {
  full: "MMMM d, yyyy",
  short: "dd/MM/yyyy",
  "month-year": "MMMM yyyy",
  "month-day": "MMMM d",
  "with-time": "MMM d, yyyy • h:mm a",
  abbreviated: "dd MMM yyyy",
};

export function formatDate(
  date: string | null | undefined,
  preset: DateFormat = "full",
): string {
  if (!date) return "—";
  return format(new Date(date), formatMap[preset]);
}

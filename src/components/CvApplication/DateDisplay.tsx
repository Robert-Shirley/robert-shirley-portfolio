import { formatDateForDisplay } from "@/lib/dateUtils";

interface DateDisplayProps {
  startDate: string;
  endDate?: string; // Made optional
}

export const DateDisplay = ({ startDate, endDate }: DateDisplayProps) => (
  <span>
    {formatDateForDisplay(startDate)} -{" "}
    {endDate ? formatDateForDisplay(endDate) : "Current"}
  </span>
);

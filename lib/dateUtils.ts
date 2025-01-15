// utils/dateUtils.ts
import { format, parse } from "date-fns";

export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return "";
  try {
    // Parse the YYYY-MM-DD format to a Date object
    const date = parse(dateString, "yyyy-MM-dd", new Date());
    // Format it to DD-MM-YYYY
    return format(date, "MM/dd/yyyy");
  } catch {
    return dateString;
  }
};

export const formatDateFromInput = (dateString: string): string => {
  if (!dateString) return "";
  try {
    // Parse the DD-MM-YYYY format to a Date object
    const date = parse(dateString, "dd/MM/yyyy", new Date());
    // Format it back to YYYY-MM-DD for the input field
    return format(date, "MM-dd-yyyy");
  } catch {
    return dateString;
  }
};

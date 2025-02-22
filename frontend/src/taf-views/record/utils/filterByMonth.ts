import { FilterFn } from "@tanstack/react-table";
import { ReadingInterface } from "../../../interface/reading-interface";

export const filterByMonth: FilterFn<ReadingInterface> = (row, columnId, filterValue) => {
    if (!filterValue) return true; // If no month is selected, show all rows
  
    const recordDate = row.original.record_date as string; // Use the raw record_date value
    const date = new Date(recordDate); // Parse the date string into a Date object

    if (!recordDate) return false;
    
    if (isNaN(date.getTime())) {
      console.error("Invalid date format:", recordDate);
      return false; // Skip invalid dates
    }
  
    const monthFromDate = date.getMonth() + 1; // Extract the month (1-12)
    console.log("Record Date:", recordDate, "Extracted Month:", monthFromDate, "Selected Month:", filterValue);
  
    return monthFromDate === parseInt(filterValue); // Compare with the selected month
  };
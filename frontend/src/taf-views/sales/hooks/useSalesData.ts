import React from 'react'
import { useMonthlySalesInformationQuery, useDailySalesInformationQuery, useGetSalesInformationQuery } from "../../../services/salesAPI";


export const useSalesData = (filter: 'Today' | 'Monthly', date?: Date | null) => {
  // // Call both Hooks unconditionally
  // const dailyQuery = useDailySalesInformationQuery();
  // const monthlyQuery = useMonthlySalesInformationQuery(
  //   date ? { month: date.getMonth() + 1, year: date.getFullYear() } : { month: 1, year: 2000 } // Default placeholder
  // );

  // // Conditionally return the appropriate data
  // if (filter === 'Today') {
  //   return dailyQuery;
  // }
  // if (filter === 'Monthly' && date) {
  //   return monthlyQuery;
  // }

  // Default return if no valid filter or date is provided
  return { data: null, isLoading: false, isError: false };
};

export default useSalesData
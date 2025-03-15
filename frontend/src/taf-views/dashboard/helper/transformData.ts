import { SalesAPIResponse } from "../../../interface/sales-interface";

// a function to transfor the data from the API to an object suitable for the Area chart

interface ChartData {
  month: string; // Month name (e.g., "January")
  sales: number; // Aggregated sales value as a number
}

export const transformData = (data: SalesAPIResponse[]): ChartData[] => {
  // Array of all months
  const allMonths = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  // Initialize monthlySales with all months set to 0
  const monthlySales: { [key: string]: number } = {};
  allMonths.forEach((month) => {
    monthlySales[month] = 0;
  });

  // Aggregate sales data by month
  data?.forEach((item) => {
    const month = new Date(item.created_at).toLocaleString('default', { month: 'short' });
    monthlySales[month] += Number(item.sold_in_money);
  });

  // Convert the aggregated data into an array for Recharts
  const chartData = allMonths.map((month) => ({
    month,
    sales: monthlySales[month],
  }));

  return chartData;
};


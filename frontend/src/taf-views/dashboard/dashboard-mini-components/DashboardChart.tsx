import React from 'react'
import { FlexBox, FlexBoxInner, Text, Div } from '../../../components/reusable/StyledComponent'
import { FaDownload } from 'react-icons/fa6'
import { FaDotCircle } from 'react-icons/fa'
import { useGetSalesInformationQuery } from '../../../services/salesAPI'

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar

 } from 'recharts';
import { parseISO, subDays, format } from 'date-fns'
import { LinearGradient } from '@react-pdf/renderer'
import { SalesAPIResponse } from '../../../interface/sales-interface'



interface Sale {
  created_at: string; // ISO date string
  sales_in_money: string; // Sales value as a string (e.g., "4000")
}

interface ChartData {
  month: string; // Month name (e.g., "January")
  sales: number; // Aggregated sales value as a number
}

const transformData = (data: SalesAPIResponse[]): ChartData[] => {
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

  console.log('Transformed Data:', chartData); // Debugging
  return chartData;
};





// const transformData = (data: SalesAPIResponse[]): ChartData[] => {
//   return data?.map((item) => {
//     // Extract the date from created_at (e.g., "2025-02-24")
//     const date2 = new Date(item.created_at).toISOString().split('T')[0];
//     const date = format(date2, "MMMM, d")

//     // Convert sold_in_money from string to number
//     const salesValue = item.sold_in_money;

//     return {
//       date,
//       sales: salesValue,
//     };
//   });
// };


const DashboardChart = () => {

 const { data: salesData} = useGetSalesInformationQuery()
 const chartData = transformData(salesData || []);

  return (
    <Div className={`bg-[#fefefe] border rounded-md px-5`}>
      <div className={`flex justify-between items-center py-4 border-b mb-10`}>
        <Text className={`font-Rubik font-semibold text-[13px] text-green-800 `}>Monthly Recurring Revenue Growth</Text>
        <div className={`flex space-x-2 text-[#333] text-opacity-50`}>
          <FaDownload />
          <FaDotCircle />
        </div>
      </div>

    <ResponsiveContainer width="100%" height={350} >
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="color" x1={0} y1={0} x2={0} y2={1}>
            <stop offset={`0%`} stopColor="#245187" stopOpacity={0.4} />
            <stop offset={`75%`} stopColor="#245187" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area
          dataKey="sales" // Corrected: Use the y-axis data key
          stroke="#245187"
          fill="url(#color)"
        />
        <XAxis
          dataKey="month" // X-axis data key
          tickLine={false}
          axisLine={false}
          fontFamily="Poppins"
          fontSize={12}
          tick={{ style: { paddingTop: '20px' } }} // Add padding below the axis line
          tickFormatter={(value) => `${value}`} // Customize the tick labels
          tickMargin={10}
         
          
        />
        <YAxis
          dataKey={`sales`} // Y-axis data key
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(number) => `${number}ETB`}
          fontFamily="Poppins"
          fontSize={10}
          allowDataOverflow={false} 
          domain={['auto', 'auto']} // Automatically adjust the y-axis range
          tickMargin={10}
        />
       <Tooltip
          content={({ payload, label }) => (
            <div className="bg-white p-2 border border-gray-200 rounded shadow font-Poppins text-[#333] text-opacity-80">
              <p className="font-semibold">{label}</p>
              <p>Sales: {payload?.[0]?.value} ETB</p>
            </div>
          )}
        />
        <CartesianGrid opacity={0.3} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  </Div>
  )
}

export default DashboardChart
import React from 'react'
import { Text, Div } from '../../../components/reusable/StyledComponent'
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
import { transformData } from '../helper/transformData'
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import useUtils from '../../../hooks/useUtils'
import { settings } from '../../../constants/menus'


const DashboardChart = () => {

 const { data: salesData} = useGetSalesInformationQuery()
 const chartData = transformData(salesData || []);

 const {dropdown, handledropdownMenu} = useUtils()

  return (
    <Div className={`bg-[#fefefe] border rounded-md px-5`}>
      <div className={`flex justify-between items-center py-5 border-b mb-10 `}>
        <Text className={`font-Rubik font-semibold text-[13px] text-green-800 `}>Monthly Recurring Revenue Growth</Text>
        <div className={`flex space-x-2 text-[#333] text-opacity-50 cursor-pointer`} onClick={handledropdownMenu}>
          <PiDotsThreeVerticalBold  color='#000'/>
          <div className='relative '>
            {
              dropdown && (
                <div className={`absolute top-7  bg-white right-0 border font-Poppins text-[#333] text-opacity-75 h-[10vh]`}>
               
                  <div className='flex flex-col space-y-1 text-nowrap px-5 py-2 hover:bg-gray-50' >
                    <Text className={`text-[12px]`}>Print</Text>
                    <Text className={`text-[12px]`}>Download</Text>

                  </div>
                  
                </div>
              )
            }
          </div>
        </div>
      </div>

    <ResponsiveContainer width="100%" height={300} >
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
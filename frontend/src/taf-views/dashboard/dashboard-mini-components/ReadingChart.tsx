import React from 'react'
import * as FaIcons from 'react-icons/fa'
import { Text } from '../../../components/reusable/StyledComponent'
import { AreaChart, ResponsiveContainer, Area, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts'
import { format, parseISO, subDays, getISOWeek, startOfWeek } from 'date-fns'
import { useGetAllReadingQuery } from '../../../services/readingAPI'

const ReadingChart = () => {

    const {data: reading} = useGetAllReadingQuery()
    const transformedData = reading?.map((item) => ({
      date: item.record_date,
      record: item.new_record,
    }))
    .filter((item) => item.date) // Remove undefined dates

  return (
    <div className={`bg-[#fefefe] border rounded-md px-5`}>
        {/* Chart Heading Component */}
        <div className={`flex justify-between items-center py-3 border-b mb-10`}>
            <Text className={`font-Rubik font-semibold text-[13px] text-green-800 `}>Record</Text>
            <div className={`flex space-x-2 text-[#333] text-opacity-50`}>
                <FaIcons.FaDownload />
                <FaIcons.FaDotCircle />
            </div>
        </div>

        <ResponsiveContainer width="100%" height={265} >
            <AreaChart data={transformedData}>
                <defs>
                  <linearGradient id="color" x1={0} y1={0} x2={0} y2={1}>
                    <stop offset={`0%`} stopColor="#245187" stopOpacity={0.4} />
                    <stop offset={`75%`} stopColor="#245187" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                  <Area
                    dataKey="record" // Corrected: Use the y-axis data key
                    stroke="#245187"
                    fill="url(#color)"
                  />
                  <XAxis
                    dataKey="date" // X-axis data key
                    scale="point"
                    tickLine={false}
                    axisLine={false}
                    fontFamily="Poppins"
                    fontSize={12}
                    tick={{ style: { paddingTop: '20px' } }} // Add padding below the axis line
                    tickFormatter={(str) => {
                      const date = parseISO(str);
                      return format(date, 'MMM d'); // Format as "Oct 1", "Oct 8", etc.
                    }}                
                    tickMargin={10}
                  />
                  <YAxis
                    dataKey={`record`} // Y-axis data key
                    axisLine={false}
                    tickLine={false}
                    tickCount={5}
                    tickFormatter={(record) => `${record}`}
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
                        <p>Sales: {payload?.[0]?.value}</p>
                      </div>
                    )}
                  />
                 <CartesianGrid opacity={0.3} vertical={false} />
        
            </AreaChart>       
        </ResponsiveContainer>
    </div>
  )
}

export default ReadingChart
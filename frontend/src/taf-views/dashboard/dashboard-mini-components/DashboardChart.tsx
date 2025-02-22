import React from 'react'
import { FlexBox, FlexBoxInner, Text, Div } from '../../../components/reusable/StyledComponent'
import { FaDownload } from 'react-icons/fa6'
import { FaDotCircle } from 'react-icons/fa'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  }
];

const DashboardChart = () => {
  return (
    <Div className={`bg-[#fefefe] border rounded-md px-5`}>
        <div className={`flex justify-between items-center pt-2 pb-4`}>
            <Text className={`font-Poppins font-semibold text-[13px]`}>Revenue Over Time</Text>
            <div className={`flex space-x-2 text-[#333] text-opacity-50`}>
                <FaDownload />
                <FaDotCircle />
            </div>
        </div>
        <div className='font-Poppins w-full'>
        <LineChart
          className={`w-full`}
          width={800}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>
      </Div>
  )
}

export default DashboardChart
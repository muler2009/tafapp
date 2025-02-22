import React from 'react'
import { FlexBox, Div, Text } from '../../../components/reusable/StyledComponent'

export interface DashboardCardsInterface {
    title: string;
    value: number;
    tag: number;
    explaination: string;
    className?:string;
    color?: string;
}

const DashboardCards = ({title, value, tag, explaination}: DashboardCardsInterface) => {
  return (
    <FlexBox className='flex flex-col space-y-2 border px-3 py-2 rounded-md'>
        <Text className='font-Poppins text-[12px] text-[#333] text-opacity-50'>{title}</Text>
        <Text className='text-[25px] font-Poppins font-semibold tracking-wider'>{value}</Text>
        <Text className='flex space-x-1 justify-start items-center'>
            <span className='bg-green-200 p-1 font-Poppins text-[12px] px-2'>{tag}</span>
            <span className='text-[#333] font-Poppins text-[12px]'>{explaination}</span>
        </Text>
        
    </FlexBox>
  )
}

export default DashboardCards
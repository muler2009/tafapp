import React from 'react'
import { FlexBox, FlexBoxInner } from '../../../components/reusable/StyledComponent'
import DashboardHeader from '../dashboard-mini-components/DashboardHeader'
import DashboardCards, { DashboardCardsInterface } from '../dashboard-mini-components/DashboardCards'
import DashboardChart from '../dashboard-mini-components/DashboardChart'
import { useMonthlySalesInformationQuery } from '../../../services/salesAPI'
import StockIndicator from '../dashboard-mini-components/StockProgressChart'
import StockProgressChart from '../dashboard-mini-components/StockProgressChart'
import CircularStockProgress from '../dashboard-mini-components/CircularStockProgress'
import HorizontalProgressBar from '../dashboard-mini-components/HorizontalProgressBar'
import { useDailySalesSummaryQuery } from '../../../services/salesAPI'
import useCard from '../hooks/useCard'
import ReadingChart from '../dashboard-mini-components/ReadingChart'
import DownloadDashboard from '../dashboard-mini-components/DownloadDashboard'




const DashboardContent = () => {
  const stockLevel = 80;

   const {gasoilStock} = useCard()
   // Accessing individual stock types dynamically

  const firstItem = gasoilStock[0] ?? {}; // Ensure there's a fallback

  const test_content: DashboardCardsInterface[] = [
      { title: "Total Income", value: 32499.63, tag: 11.99, explaination: "Just for test", color: "#000" },
      { title: "Daily Sold Liter", value: firstItem.total_sold_qty ?? "N/R", tag: 21.99, explaination: "Total liters sold today", color: "#fff" },
      // { title: "Fuel Type", value: firstItem.total_sales ?? "Unknown", tag: 31.99, explaination: "Type of fuel sold", color: "#fff" },
      // { title: "Total Sales", value: firstItem.total_sales ?? 0, tag: 0.99, explaination: "Total revenue from sales", color: "#fff" },
  ];
  
  return (
    <FlexBox className='w-full bg-gray-100'>
        <DashboardHeader />
        <FlexBox className={`flex space-x-1 py-2 pl-1 pr-5`}>
          <FlexBoxInner className='w-[35%] flex flex-col space-y-1 h-full'>
            <StockProgressChart />
             
          </FlexBoxInner>
          <FlexBoxInner className='flex flex-col space-y-1 flex-grow'>
            <ReadingChart />
            <DownloadDashboard />
          </FlexBoxInner>
        </FlexBox>
        <FlexBox className={`flex space-x-1 pl-2`}>
          <FlexBoxInner className={`w-[65%]`}>
            <DashboardChart />
          </FlexBoxInner>
          <FlexBoxInner className='flex-grow space-y-1'>
            {/* <StockProgressChart /> */}
            <HorizontalProgressBar />
          </FlexBoxInner>
        </FlexBox>
    </FlexBox>
  )
}

export default DashboardContent
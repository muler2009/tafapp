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

const test_content: DashboardCardsInterface[] = [
  {title: "Total Income", value: 32499.63, tag: 11.99, explaination: "Just for test", color:"#000"},
  {title: "Daily Sold Liter", value: 123241221, tag: 21.99, explaination: "Just for test", color:"#fff"},
  {title: "Machine", value: 123241221, tag: 31.99, explaination: "Just for test", color:"#fff"},
  {title: "Daily Reading", value: 123241221, tag: 0.99, explaination: "Just for test", color:"#fff"}

]



const DashboardContent = () => {
  const stockLevel = 80;
  return (
    <FlexBox className='w-full'>
        <DashboardHeader />
        <FlexBox className='flex space-x-5 px-5 pt-5 pb-2'>
          {
            test_content?.map((test, index) => {
              return(
                <FlexBoxInner className='flex-grow'>
                  <DashboardCards 
                    title={test.title}
                    value={test.value}
                    tag={test.tag}
                    explaination={test.explaination}
                    className={`bg-${test.color} p-5 rounded-lg text-white`}
                  />
                </FlexBoxInner>
              )
            })
          }
        </FlexBox>
        <FlexBox className={`flex space-x-2 px-5`}>
          <FlexBoxInner className={`w-[65%]`}>
            <DashboardChart />
          </FlexBoxInner>
          <FlexBoxInner className='flex-grow space-y-1'>
            <StockProgressChart />
            <HorizontalProgressBar />
          </FlexBoxInner>
        </FlexBox>
    </FlexBox>
  )
}

export default DashboardContent
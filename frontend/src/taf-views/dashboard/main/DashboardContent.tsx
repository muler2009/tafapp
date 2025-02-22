import React from 'react'
import { FlexBox, FlexBoxInner } from '../../../components/reusable/StyledComponent'
import DashboardHeader from '../dashboard-mini-components/DashboardHeader'
import DashboardCards, { DashboardCardsInterface } from '../dashboard-mini-components/DashboardCards'
import DashboardChart from '../dashboard-mini-components/DashboardChart'

const test_content: DashboardCardsInterface[] = [
  {title: "Total Income", value: 32499.63, tag: 11.99, explaination: "Just for test", color:"#000"},
  {title: "Daily Sold Liter", value: 123241221, tag: 21.99, explaination: "Just for test", color:"#fff"},
  {title: "Machine", value: 123241221, tag: 31.99, explaination: "Just for test", color:"#fff"},
  {title: "Daily Reading", value: 123241221, tag: 0.99, explaination: "Just for test", color:"#fff"}

]

const DashboardContent = () => {
  return (
    <FlexBox className='w-full'>
        <DashboardHeader />
        <FlexBox className='flex space-x-5 px-5 py-5'>
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
        <FlexBox className={`flex space-x-4 px-5`}>
          <FlexBoxInner className={`w-[60%]`}>
            <DashboardChart />
          </FlexBoxInner>
        </FlexBox>
    </FlexBox>
  )
}

export default DashboardContent
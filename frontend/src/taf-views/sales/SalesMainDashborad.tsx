import React from 'react'
import SalesInformationTable from './sales-components/SalesInformationTable'
import SalesNavigation from './sales-components/SalesNavigation'

const SalesMainDashborad = () => {
  return (
    <React.Fragment>
      <SalesNavigation />
      <SalesInformationTable />
    </React.Fragment>
  )
}

export default SalesMainDashborad
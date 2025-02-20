import React from 'react'
import StockNavigationComponent from '../stock-component/StockNavigationComponent'
import StockDataInformationTable from '../stock-component/StockDataInformationTable'

const StockMainDashboard = () => {
  return (
    <React.Fragment>
        <StockNavigationComponent />
        <StockDataInformationTable />
    </React.Fragment>
  )
}

export default StockMainDashboard
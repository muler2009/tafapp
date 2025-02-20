import React from 'react'
import RecordNavigationComponent from '../record-components/RecordNavigationComponent'
import RecordInformationTable from '../record-components/RecordInformationTable'

const RecordMainDashboard = () => {
  return (
    <React.Fragment>
        <RecordNavigationComponent />
        <RecordInformationTable />
    </React.Fragment>
  )
}

export default RecordMainDashboard
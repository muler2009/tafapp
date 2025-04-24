import React from 'react'
import MachineInformationTable from '../machine-mini-component/MachineInformationTable'
import MachineNavigationComponent from '../machine-mini-component/MachineNavigationComponent'
import { FlexBox, FlexBoxInner } from '../../../components/reusable/StyledComponent'

const MachineMainDashboard = () => {
  return (
    <React.Fragment>
        <MachineNavigationComponent />
        <MachineInformationTable />
    </React.Fragment>
  )
}

export default MachineMainDashboard
import React from 'react'
import Routes from '../Routes/TafRoutes'
import { Outlet } from 'react-router-dom'

const TafDashboard = () => {
  return (
    <div>
        <Outlet />
        
    </div>
  )
}

export default TafDashboard
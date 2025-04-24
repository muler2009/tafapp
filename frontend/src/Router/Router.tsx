import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { Layout } from '../layout/Layout'
import MainLayout from '../layout/MainLayout'
import WelcomeComponent from '../taf-views/dashboard/dashboard-mini-components/DashboardHeader'
import Dashboard from '../layout/Dashboard'
import SalesInformationTable from '../taf-views/sales/sales-components/SalesInformationTable'
import SalesMainDashborad from '../taf-views/sales/SalesMainDashborad'
import RecordMainDashboard from '../taf-views/record/main/RecordMainDashboard'
import StockMainDashboard from '../taf-views/stock/main/StockMainDashboard'
import MachineMainDashboard from '../taf-views/machine/main/MachineMainDashboard'
import Login from '../login/main/Login'
import ProtectedRoute from '../api/ProtectedRoute'
import TafRoutes from '../taf-views/Routes/TafRoutes'


const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />} errorElement={<h1>Erroe Message</h1>}>
                <Route path='/' element={<Login />} />
                <Route element={<ProtectedRoute />} >
                    <Route path='taf/*' element={<MainLayout />} />                            
                </Route>
              
            </Route>  
        )
    )
    return router
}

export default Router



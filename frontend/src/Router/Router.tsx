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


const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />} errorElement={<h1>Erroe Message</h1>}>
                <Route path='/' element={<MainLayout />} >
                    <Route path='stock' element={<StockMainDashboard />} />
                    <Route path='machine' element={<MachineMainDashboard />} />
                    <Route path='record' element={<RecordMainDashboard />} />
                    <Route path='sales' element={<SalesMainDashborad />} />
                    <Route path='.' element={<h1>Main page</h1>} />
                </Route>  
            </Route>  
        )
    )
    return router
}

export default Router



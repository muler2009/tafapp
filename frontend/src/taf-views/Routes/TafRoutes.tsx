import React, { Component } from 'react'
import { useRoutes } from 'react-router-dom';
import DashboardHeader from '../dashboard/dashboard-mini-components/DashboardHeader';
import Dashboard from '../../layout/Dashboard';
import TafDashboard from '../dashboard/TafDashboard';
import DashboardContent from '../dashboard/main/DashboardContent';
import StockMainDashboard from '../stock/main/StockMainDashboard';
import MachineMainDashboard from '../machine/main/MachineMainDashboard';
import RecordMainDashboard from '../record/main/RecordMainDashboard';
import SalesMainDashborad from '../sales/SalesMainDashborad';

interface Route {
    path: string;
    element: React.ReactElement;
    children?: Route[]
}

interface RouteWithChildren {
    element: React.ReactElement;
    children: Route[];
}

const TafRoutes = () => {
  const routes: (Route | RouteWithChildren)[] = [

    { path: '/',  element: <DashboardContent /> },
    { path: 'stock', element: <StockMainDashboard />},
    { path: 'machine', element: <MachineMainDashboard />},
    { path: 'record', element: <RecordMainDashboard /> },
    { path:'sales', element: <SalesMainDashborad />},
    { path: 'login',  element: <h1>Login</h1> }, 
  ]

  return useRoutes(routes)
}

export default TafRoutes

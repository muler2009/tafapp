import React, { Component } from 'react'
import { useRoutes } from 'react-router-dom';
import DashboardHeader from '../dashboard/dashboard-mini-components/DashboardHeader';
import Dashboard from '../../layout/Dashboard';
import TafDashboard from '../dashboard/TafDashboard';
import DashboardContent from '../dashboard/main/DashboardContent';

interface Route {
    path: string;
    element: React.ReactElement;
    children?: Route[]
}

interface RouteWithChildren {
    element: React.ReactElement;
    children: Route[];
}

const Routes = () => {
  const routes: (Route | RouteWithChildren)[] = [
    { path: '/',  element: <DashboardContent /> },
    { path: 'login',  element: <h1>Login</h1> }, 
    {
      path: '.', element: <TafDashboard />,
      children: [
        { path:"machine", element:<h1>Machine</h1>},
        { path:"sales", element:<h1>Sales</h1>},
        { path:"record", element: <h1>Record</h1>},

      ] 
    }


  ]

  return useRoutes(routes)
}

export default Routes

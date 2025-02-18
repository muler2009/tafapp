import React, { Component } from 'react'
import { useRoutes } from 'react-router-dom';
import WelcomeComponent from '../dashboard/WelcomeComponent';
import Dashboard from '../../layout/Dashboard';
import TafDashboard from '../dashboard/TafDashboard';

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
    { path: '/',  element: <WelcomeComponent /> },
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

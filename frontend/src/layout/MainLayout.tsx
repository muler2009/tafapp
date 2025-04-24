import React from 'react'
import Header from '../components/common/Header'
import { FlexBox, FlexBoxInner, Div } from '../components/reusable/StyledComponent'
import SideBarMain from '../components/reusable/side-tree/SideBarMain'
import sidebar_link from '../constants/menus'
import Dashboard from './Dashboard'
import AppHeader from '../components/common/Header'
import MainTree from '../components/reusable/Tree/MainTree'
import { Outlet } from 'react-router-dom'
import Routes from '../taf-views/Routes/TafRoutes'
import TafRoutes from '../taf-views/Routes/TafRoutes'
import Footer from '../components/common/Footer'

const MainLayout = () => {
  return (
      <div className='bg-[#fff]'>
        <div className='flex flex-1 h-screen z-10'>
            <MainTree  menu={sidebar_link}/>
            <div className='w-full flex flex-col'>
                <Header />
                <Outlet />
                {TafRoutes()}
            </div>
        </div>
        <Footer />
      </div>
  )
}

export default MainLayout
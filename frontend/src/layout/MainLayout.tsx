import React from 'react'
import Header from '../components/common/Header'
import { FlexBox, FlexBoxInner, Div } from '../components/reusable/StyledComponent'
import SideBarMain from '../components/reusable/side-tree/SideBarMain'
import sidebar_link from '../constants/menus'
import Dashboard from './Dashboard'
import AppHeader from '../components/common/Header'

const MainLayout = () => {
  return (
    <React.Fragment>
      <header className='border-b shadow-sm bg-gray-50 font-Poppins sticky top-0 z-50'>
        <AppHeader />
      </header>
      <main className='h-[90vh]'>
        <Dashboard />
      </main>
      <footer className='grid content-center bottom-0'>
       fotter
      </footer>
    </React.Fragment>
  )
}

export default MainLayout
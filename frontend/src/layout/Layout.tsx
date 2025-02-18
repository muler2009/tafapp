import React from 'react'
import { Outlet } from 'react-router-dom'
import { FlexOuterContainer } from '../components/reusable/StyledComponent'
export const Layout = () => {
  return (
    <React.Fragment>
        <FlexOuterContainer className="w-screen h-screen overflow-x-hidden">
            <Outlet />
        </FlexOuterContainer> 
    </React.Fragment>
  )
}
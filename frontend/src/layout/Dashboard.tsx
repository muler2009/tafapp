import React from 'react'
import { FlexBox, FlexBoxInner, Div } from '../components/reusable/StyledComponent';
import SideBarMain from '../components/reusable/side-tree/SideBarMain';
import { Outlet } from 'react-router-dom';
import sidebar_link from '../constants/menus';
import AdminRoutes from '../taf-views/Routes/TafRoutes';
import Routes from '../taf-views/Routes/TafRoutes';

const Dashboard = () => {
  return (
    <FlexBox className="flex h-full">
      <FlexBoxInner className="my-[1px] w-[20%]">
        <Div className="flex flex-col space-y-3">
          <div className="flex space-x-3 px-5 pt-4 pb-2">
            {/* <div className="h-16 w-16 rounded-full border" /> */}
            {/* <img src={user} alt="user profile picture" className="h-16 w-16 rounded-full border object-cover object-center" /> */}
            <div className="flex items-center">
              <p className="text-[14px] font-semibold font-Poppins">
                 <span className="block text-[12px] font-normal">position of the user</span> 
              </p>
            </div>
          </div>
          <Div className="pt-3 flex flex-col flex-grow">
            <SideBarMain menus={sidebar_link} />
          </Div>
        </Div>

      </FlexBoxInner>
      <FlexBox className="w-full border overflow-y-scroll">
        <Outlet />
        <Routes />
      </FlexBox>
    </FlexBox> 
  );
}

export default Dashboard
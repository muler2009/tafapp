import React, { useState, useCallback } from 'react'
import * as MdIcons from 'react-icons/md'
import TreeMenuList from './TreeMenuList'
import { TreeMenuItemInterface } from '../../../interface/tree-menu-interface'
import { useSelector } from 'react-redux'
import { username, fullName } from '../../../api/auth' 
import { FlexBox, Text } from '../StyledComponent'
import BottomTooltip from '../BottomTooltip'
import taf_logo from '../../../assets/images/taf-logo.png'

interface SideMenuInterface {
  menu: TreeMenuItemInterface[] | undefined
}

const MainTree = ({menu = []}: SideMenuInterface) => {

  const [controller, setController] = useState<boolean>(true)
  const handleOpenCloseSideBar = useCallback(() => {setController(prev => ! prev)}, [])
  const loggedUser = useSelector(fullName)

  return (
      <div className={`font-IBMPlexSans flex flex-col h-screen  border-opacity-40 shadow-md z-10 cursor-pointer overflow-x-hidden text-white ${controller ? 'w-[23rem] bg-[#fff]': 'w-[70px] bg-[#fff] text-white'}`}>
        <div className={`relative pt-5 px-1`}>
            <div className={`${controller ? 'flex justify-between items-center pr-5 text-black border-b border-[#fff] border-opacity-20' : 'block pt-5'  } `}>
                {
                    controller && (
                        <div className="flex space-x-1 items-center cursor-pointer px-8">
                            <img src={taf_logo} className='w-[50px] h-[50px]' />
                            <Text className="text-[30px] text-taf-color font-semibold pt-1 tracking-wider">
                                TAF
                                <span className="text-[13px]  block -mt-3 pl-1 text-green-500 tracking-normal text-nowrap">Oil ethiopia</span>                
                            </Text>   
                        </div>
                    )
                }
                <div className={` flex justify-center items-center text-[#333]`}>
                    {
                        !controller
                        ? (
                            <div className='shadow-md '>
                                <MdIcons.MdMenu size={25} onClick={handleOpenCloseSideBar}/>
                            </div>
                        ) : (
                            <div className='shadow-sm '>
                                <MdIcons.MdMenu size={25} onClick={handleOpenCloseSideBar}/>
                            </div>
                        ) 
                    }
                </div>
            </div>
            <div className={`pb-[3px] ${!controller ? 'hidden': 'flex' }`}>
                <div className='px-10 flex items-center flex-grow py-2 space-x-1 '>                      
                    <Text className='font-Poppins text-black text-[25px]'>
                        <span className='font-Poppins text-[13px] text-[#05d876]'>{loggedUser}</span>
                    </Text>                       
                </div>
            </div>
            <div className='flex flex-col py-4 text-black'>
                <FlexBox className={`flex justify-start pl-10 pb-4  ${!controller && 'opacity-0 translate-x-28 overflow-hidden'}`}>
                    <Text className='font-Poppins font-semibold text-[#333] text-opacity-65'>Main Menu</Text>
                </FlexBox>
              <TreeMenuList list={menu} controller={controller} />
            </div>
        </div>
      </div>

  )
}

export default MainTree
import React, {useState, useCallback} from 'react'
import { FlexInnerContainer, FlexBox, FlexBoxInner, Text, Div} from '../reusable/StyledComponent';
import { Link } from 'react-router-dom';
import { LiaPowerOffSolid } from "react-icons/lia";
import { TfiBell } from "react-icons/tfi";
import taf_logo from "../../assets/images/taf-logo.png"
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import useUtils from '../../hooks/useUtils';
import { settings } from '../../constants/menus';
import useLogout from '../../login/hooks/useLogout';
import ChangePasswordComponent from '../../login/login_mini_components/ChangePasswordComponent';
import ModalForDropDown from '../reusable/ModalForDropDown';



const AppHeader = () => {

    const {dropdown, handledropdownMenu, handleIsOpenCloseMenu, isOpen} = useUtils()
    const {onUserLogoutClicked} = useLogout()

    const [triggerModal, setTriggerModal] = useState<{[key: string]: boolean}>({});
    const [activeIndex, setActiveIndex] = useState<number>(0)
  
    const handleOpenCloseActiononRoleHeader = useCallback((label: string) => {
      setTriggerModal(prevState => ({
        ...prevState,
        [label]: !prevState[label]
      }))
    }, []);


    return (
        <FlexBox className="flex justify-between items-center px-8 shadow-sm py-2 font-Poppins">
          <div className='flex'>
              <Text className=" text-taf-color font-semibold py-2">
                <span></span>Dashboard
              </Text>   

          </div>
                
    
            <div className={`flex justify-between items-center space-x-2 px-8 divide-x-[1px] cursor-pointer`}>
                <div className="flex justify-between items-center px-2" onClick={handledropdownMenu}>
                  <Text className='text-[13px] text-[#333] text-opacity-80 flex items-center'>
                    Setting <span className='pl-3 transition duration-200'> 
                      {
                        dropdown ? <MdArrowDropUp/> : <MdArrowDropDown /> 
                      }

                    </span>
                  </Text>
                  <div className='relative'>
                    {
                      dropdown && (
                        <div className={`absolute top-7  bg-white right-0 border font-Poppins text-[#333] text-opacity-75 h-[10vh]`}>
                          {
                            settings?.map((setting, index) => {
                              return(
                                <div className='flex flex-col space-y-1 text-nowrap px-5 py-2 hover:bg-gray-50' key={index} onClick={() => handleOpenCloseActiononRoleHeader(setting.label)}>
                                  <Text className={`text-[12px]`}>{setting.link_identifier}</Text>
                                </div>
                              )
                            })
                          }
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className=''>
                  <button className="py-[7px] flex items-center hover:bg-taf-color rounded-sm text-[#333] text-opacity-80 hover:text-white space-x-2 ml-1 px-3" onClick={onUserLogoutClicked} >
                    <LiaPowerOffSolid />
                    <Text className="text-[12px]">Logout</Text>
                  </button>
                </div>
            </div>

            {
              Object.keys(triggerModal).map(link_identifier => 
                triggerModal[link_identifier] && (
                  <ModalForDropDown 
                    key={link_identifier}
                    isOpen={triggerModal[link_identifier]}
                    onRequestClose={() => handleOpenCloseActiononRoleHeader(link_identifier)}
                    title={link_identifier}
                    link_identifier={link_identifier}
                  />
                )
              )}
            
            {/* <ChangePasswordComponent isOpen={!isOpen["Change Password"]} onClose={()=>handleIsOpenCloseMenu("Change Password")} /> */}
            

            
        </FlexBox>
    );
 };

export default AppHeader


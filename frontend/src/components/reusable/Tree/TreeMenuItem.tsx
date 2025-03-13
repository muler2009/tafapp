import React, { useState, useCallback } from "react";
import { MenuItemInterface } from "../../../interface/side-bar-interface";
import SideMenuList from "./TreeMenuList";
import * as FaIcons from "react-icons/fa";
import * as PiIcons from "react-icons/pi";
import { FlexBox, FlexBoxInner } from "../StyledComponent";
import { Link } from "react-router-dom";
import * as GiIcons from "react-icons/gi";
import { VscSymbolFile } from "react-icons/vsc";
import { P } from "../StyledComponent";
import { AiFillDashboard } from "react-icons/ai";
import { useSelector } from "react-redux";
import { username } from "../../../api/auth";
import { TreeMenuItemInterface } from "../../../interface/tree-menu-interface";
import { SideMenuListItemProps, DisplayChildrensInterface } from "../../../interface/tree-menu-interface";
import TreeMenuList from "./TreeMenuList";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";



const TreeMenuItem = ({ listItem, controller }: SideMenuListItemProps) => {
  // a state for handling open and closing
  const loggedInUser = useSelector(username)
  const [displayChildrens, setDisplayCurrentChildren] = useState<DisplayChildrensInterface>({});

  // Toggle handler
  const handleToggleChildren = useCallback(
    (getCurrent: string) => {
      setDisplayCurrentChildren((prevState) => ({
        ...prevState,
        [getCurrent]: !prevState[getCurrent],
      }));
    },
    []
  );

  return (
   
      <FlexBoxInner className={`${controller && 'pl-5'}`}>
            {
              listItem.path
              ? ( 
                  <Link to={listItem.path} className={`flex justify-between items-center py-2 cursor-pointer font-Poppins text-sm text-[#333]`} onClick={() => handleToggleChildren(listItem.label)}>
                    <div className="px-4 flex items-center justify-start space-x-3">

                        {
                          listItem.label === 'Dashboard' ? 
                            (
                                <div className={`${!controller ? 'text-[15px]' : 'text-[15px]'}`}>
                                  <AiFillDashboard  className={`text-[#333] ${!controller ? 'text-[15px]' : 'text-[15px]'}`}/>

                                </div>
                            ) : ( 

                              listItem && listItem.children && listItem.children.length ? (
                                    <div className={``}>
                                      {
                                          displayChildrens[listItem.label] 
                                            ? (
                                                <>
                                                  {
                                                    listItem.icon ? (<>{listItem.icon}</>) : <GiIcons.GiOpenFolder size={17} className="text-white" />

                                                  }
                                                </>
                                              )
                                            : (
                                                <>
                                                {
                                                  listItem.icon ? (<>{listItem.icon}</>) : <PiIcons.PiFolderSimplePlusFill size={17} className="text-white" />

                                                }
                                              </>
                                            )
                                        }
                                    </div>
                                ): (
                                  <>{
                                    listItem.icon ? (<div className={`${!controller ? 'text-[20px] block' : 'text-[15px]'}`}>{listItem.icon}</div>) : <VscSymbolFile />
                                  }</> 
                                )                         
                            )
                        }
                        <div className={`flex text-[12px] duration-500 font-Poppins font-normal ${!controller && 'opacity-0 translate-x-28 overflow-hidden'}`}>
                          {listItem.label}
                        </div>
                    </div>
                    <div className="group pr-5">
                        {
                          listItem && listItem.children && listItem.children.length ? (
                            <>
                              {
                                displayChildrens[listItem.label] ? (<MdArrowDropUp size={20} />) : (<MdArrowDropDown  size={20} />)
                              }
                            
                            </>
                          ) : null
                        }
                    </div>
                  </Link>
              ) : (
                <P className="text-[12px] hover:bg-gray-50">{listItem.label}</P>
              )}

            {
              listItem.children && listItem.children.length > 0 && displayChildrens[listItem.label] && (
                <TreeMenuList list={listItem.children} controller={controller || true}/>
              )
            }
      </FlexBoxInner>      
    
  );
};

export default TreeMenuItem;


// {
//   listItem && listItem.children && listItem.children.length ? (
//     <span>
//       {
//         displayChildrens[listItem.label] 
//         ? <PiIcons.PiFolderSimpleMinusFill size={20} className="text-yellow-600" /> 
//         : <PiIcons.PiFolderSimplePlusFill size={20} className="text-yellow-600" />
//       }

//     </span>
//   ): null
  
// }
//    <p className="text-[12px] hover:bg-gray-100">{listItem.label}</p>
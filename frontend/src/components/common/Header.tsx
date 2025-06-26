import React, {useState, useCallback, useEffect, useRef, useMemo} from 'react'
import { FlexInnerContainer, FlexBox, FlexBoxInner, Text, Div} from '../reusable/StyledComponent';
import { Link, useLocation } from 'react-router-dom';
import { LiaPowerOffSolid } from "react-icons/lia";
import { TfiBell } from "react-icons/tfi";
import taf_logo from "../../assets/images/taf-logo.png"
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import useUtils from '../../hooks/useUtils';
import sidebar_link, { settings } from '../../constants/menus';
import useLogout from '../../login/hooks/useLogout';
import ChangePasswordComponent from '../../login/login_mini_components/ChangePasswordComponent';
import ModalForDropDown from '../reusable/ModalForDropDown';
import ConfirmationModal from '../confirmation/ConfirmationModal';
import useSuccess from '../../hooks/useSuccess';
import { AiFillDashboard } from "react-icons/ai";


export const findLabelByPath = ( menuItems: any[], currentPath: string, parentLabel = '' ): string | undefined => {
  for (const item of menuItems) {
    // Check if current item matches the path
    if (currentPath.includes(item.path)) {
      return parentLabel ? `${parentLabel} > ${item.label}` : item.label;
    }
    
    // If it has children, search within them
    if (item.children) {
      const childLabel = findLabelByPath(
        item.children,
        currentPath,
        item.label // Pass current item's label as parent
      );
      if (childLabel) return childLabel;
    }
  }
  return undefined;
};


type BreadcrumbSegment = { name: string; path: string };

const normalizePath = (path: string) => path.replace(/\/+$/, '');

export const findBreadcrumbPath = (
  menuItems: any[],
  currentPath: string,
  basePath = ''
): BreadcrumbSegment[] | undefined => {
  const normalizedCurrentPath = normalizePath(currentPath);

  for (const item of menuItems) {
    const isAbsolute = item.path.startsWith('/');
    const fullPath = normalizePath(isAbsolute ? item.path : `${basePath}/${item.path}`);
    const segment = { name: item.label, path: fullPath };

    // ✅ Exact match (works for both nested and standalone paths)
    if (normalizedCurrentPath === fullPath) {
      return [segment];
    }

    // Handle children (for nested paths under /taf/)
    if (item.children) {
      const childPath = findBreadcrumbPath(item.children, currentPath, fullPath);
      if (childPath) {
        return [segment, ...childPath];
      }
    }

    // Partial match (for nested paths)
    if (!isAbsolute && normalizedCurrentPath.startsWith(fullPath + '/')) {
      if (item.children) {
        const childPath = findBreadcrumbPath(item.children, currentPath, fullPath);
        if (childPath) {
          return [segment, ...childPath];
        }
      }
    }
  }

  return undefined;
};


const AppHeader = () => {

    const {dropdown, handledropdownMenu, handleIsOpenCloseMenu, isOpen, setDropDown} = useUtils()
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const {onUserLogoutClicked} = useLogout()
    const location = useLocation();


    const [triggerModal, setTriggerModal] = useState<{[key: string]: boolean}>({});
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const segments = findBreadcrumbPath(sidebar_link, location.pathname) ?? [];
  
    const handleOpenCloseActiononRoleHeader = useCallback((label: string) => {
      setTriggerModal(prevState => ({
        ...prevState,
        [label]: !prevState[label]
      }))
    }, []);

    const {success, setSuccess, successMessage, } = useSuccess()

    const closeDropdown = useCallback(() => {
      setDropDown(false); // Explicitly close dropdown
    }, []);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          closeDropdown(); // Close instead of toggle
        }
      };
  
      if (dropdown) {
        document.addEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [dropdown, closeDropdown]);
  


    // Get the current path
    const currentPath = location.pathname.split('/').pop(); // Get the last part of the path (e.g., "request" or "requested-sent")

    // Memoize the label for performance
    const currentLabel = useMemo(
        () => findLabelByPath(sidebar_link, currentPath || ''),
        [currentPath]
      );

      console.log(segments)

    return (
        <FlexBox className="flex justify-between items-center pl-5 pr-8 shadow-sm py-2 font-Poppins sticky top-0 z-10 bg-gray-50">
          <div className='flex text-nowrap'>
              {/* <h1 className='font-Poppins text-sm pl-2'>{currentLabel ? currentLabel : "Dashboard"}</h1> */}

              <h1 className='flex space-x-1 items-center'>
                {
                  segments.map((segment, index) => (
                    <div key={index} >
                      <Link to={segment.path} className={index === segments.length - 1 ? "text-[13px] text-[#333] text-opacity-50 font-normal" : "text-[13px] text-blue-500 hover:underline"} >
                          {segment.name}
                      </Link>
                      {index < segments.length - 1 && <span className="mx-2 text-black pl-2">{'>'}</span>}
                    </div>
                    ))
                }
              </h1>
          

          </div>
                
    
            <div className={`flex justify-between items-center space-x-2 px-8 divide-x-[1px] cursor-pointer`} ref={dropdownRef}>
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
            
            
            <ConfirmationModal success={success} successMessage={successMessage} />
            
        </FlexBox>
    );
 };

export default AppHeader


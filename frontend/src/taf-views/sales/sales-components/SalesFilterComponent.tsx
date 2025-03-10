import React, {useState, useRef} from 'react'
import useUtils from '../../../hooks/useUtils';
import { filterOptions } from '../../../constants/salesfilterOption';
import { Text, FlexOuterContainer, FlexBoxInner, FlexBox } from '../../../components/reusable/StyledComponent';
import * as AiIcons from "react-icons/ai";
import { file_menu } from '../../../constants/salesfilterOption';


const SalesFilterComponent = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("Today");
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const {dropdown, handledropdownMenu, handleIsOpenCloseMenu, activeLabel, setActiveLabel} = useUtils()

  // const {dropdown, handledropdownMenu} = useUtils()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleSelect = (label: string) => {
    setSelectedFilter(label);
    setIsOpen(false);
    setOpenSubmenu(null);
    console.log(`Selected: ${label}`);
  };

  return (
    
    <div className="relative z-50">
      <div className="px-4 py-2 bg-gray-100 rounded cursor-pointer" onClick={handledropdownMenu}>
        <div className={`font-Poppins text-[12px] flex justify-between items-center w-32`}>
          <h5> Sales Report</h5>
          
          <span>
            {dropdown ? <AiIcons.AiOutlineCaretUp /> : <AiIcons.AiOutlineCaretDown />}
          </span>
        </div> 
      </div>
      {
        dropdown && (
          <div className="absolute top-12 left-0 w-40 bg-white border shadow-lg font-Poppins" onMouseLeave={() => setOpenSubmenu(null)}>
            {
              filterOptions.map((option) => (
                <div key={option.label} className="relative">
                  <div className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between ${ option.children ? "" : "text-center" }`}
                    onClick={() => !option.children && handleSelect(option.label)}
                     onMouseEnter={() => option.children && setOpenSubmenu(option.label)}
                  >
                    {option.label} {option.children && <span>›</span>}
                  </div>
    
                  
                  {option.children && openSubmenu === option.label && (
                    <div className="absolute left-full top-0 w-40 bg-white border shadow-lg rounded-md">
                      {option.children.map((child) => (
                        <div
                          key={child.label}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelect(child.label)}
                        >
                          {child.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
}

export default SalesFilterComponent


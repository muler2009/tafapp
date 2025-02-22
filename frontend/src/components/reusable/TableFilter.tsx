import React, {useState} from 'react'
import { filter_month } from '../../constants/month'
import useUtils from '../../hooks/useUtils'
import { Div } from './StyledComponent'
import { FilterPropsInterface } from '../../interface/table-interface'
import { TableFilterProps } from '../../interface/table-interface'
import { GoFilter } from "react-icons/go";


const TableFilter = ({table, onMonthChange}: TableFilterProps) => {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = e.target.value;
    setSelectedMonth(month);
    onMonthChange(month); // Pass the selected month back to the parent
    console.log(month)
  };


  return (
    <Div className="relative ml-1">
      <select
        value={selectedMonth}
        onChange={handleMonthChange}
        className={`select-md rounded-sm font-Poppins py-2 px-4 w-full text-[12px] bg-gray-50`}         
      >
        <option value="" className="font-Poppins px-2 text-[12px] ">
          Filter 
        </option>
        {[...Array(12)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>
       <span className='flex justify-center items-center absolute top-0 border-gray-300 border-r-[1px] border-t border-b right-0 text-gray-500 bg-gray-50 h-full w-[30px] pointer-events-none '>
          <GoFilter />
      </span>
    </Div>
  );
}

export default TableFilter
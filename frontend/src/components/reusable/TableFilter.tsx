import React, {useState} from 'react'
import { filter_month } from '../../constants/month'
import useUtils from '../../hooks/useUtils'
import { Div } from './StyledComponent'
import { FilterPropsInterface } from '../../interface/table-interface'

// interface TableFilterProps {
//     filter: FilterPropsInterface[];
//   }

{/* <div className='flex flex-col absolute right-1 z-50 bg-white w-full top-1 border my-1'>
{
    
        filter?.map((filter, index) => {
            return(
                <div className='px-3 py-1 font-Poppins text-[#333] text-opacity-50 text-[12px] cursor-pointer hover:bg-taf-color hover:text-white' key={index}
                 onClick={() => alert(`${filter.label}`)}>
                    {filter.label}
                </div>
            )
        })
   
}
</div> */}



const months = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

interface TableFilterProps {
  table: any;
  onMonthChange: (month: string) => void;
}

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
        className="select-md font-Poppins text-[12px] bg-gray-200 focus-within::bg-gray-200"
        
      >
        <option value="" className="font-Poppins px-2 text-[12px] ">
          --- Filter Record --- 
        </option>
        {[...Array(12)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>
    </Div>
  );
}

export default TableFilter
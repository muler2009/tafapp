import React, {useState, useRef, useEffect, useCallback} from 'react'
import useUtils from '../../../hooks/useUtils';
import DatePicker from 'react-datepicker';
import * as BiIcons from 'react-icons/bs'
import "react-datepicker/dist/react-datepicker.css";
import '../../../assets/css/custom.css'
import * as RxIcons from "react-icons/rx";
import { useDailySalesInformationQuery, useMonthlySalesInformationQuery } from '../../../services/salesAPI';
import DailySalesModal from './DailySalesModal';
import EmptyResultModal from '../../../components/errors/EmptyResultModal';
import SalesPDF from './sales-pdf/SalesPDF';
import SalesReportPDF from './sales-pdf/SalesReportPDFModal';
import { format } from 'date-fns';


// const useSalesData = (filter: 'Today' | 'Monthly', date?: Date | null) => {
//   // Call both Hooks unconditionally
//   const dailyQuery = useDailySalesInformationQuery();
//   const monthlyQuery = useMonthlySalesInformationQuery(
//     date ? { month: date.getMonth() + 1, year: date.getFullYear() } : { month: 1, year: 2000 } // Default placeholder
//   );

//   // Conditionally return the appropriate data
//   if (filter === 'Today') {
//     return dailyQuery;
//   }
//   if (filter === 'Monthly' && date) {
//     return monthlyQuery;
//   }

//   // Default return if no valid filter or date is provided
//   return { data: null, isLoading: false, isError: false };
// };


interface FilterOption {
  label: string;
  type: 'sales' | 'monthly';
}

const salesFilters: FilterOption[] = [
  { label: 'Today', type: 'sales' },
  { label: 'Monthly', type: 'monthly' },
];

const SalesFilterDatePicker = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [month, setMonth] = useState<number | null>(null); // Store selected month
  const [year, setYear] = useState<number | null>(null); // Store selected year
  
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { dropdown, handledropdownMenu, handleIsOpenCloseMenu, isOpen, setDropDown, open, handleIsOpenCloseMenuModal } = useUtils();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false); // for showing the date picker when selected


  const { data: dailySales, error: dailySalesError, isLoading: dailyLoading } = useDailySalesInformationQuery(
    undefined, // No argument needed if API doesn’t require params
    { skip: selectedFilter !== "Today" }
  );

  const { data: monthlySales, error: monthlyError, isLoading: monthlyLoading } = useMonthlySalesInformationQuery(
    { month: month ?? 0, year: year ?? 0 }, // Ensure month and year are always numbers
    { skip: selectedFilter !== "Monthly" || !month || !year } // Skip query if filter is not "Monthly" or values are missing
  );

  console.log(monthlySales)

  // extracting the error message from the recieved backend

  const errorData = dailySalesError && "data" in dailySalesError && typeof dailySalesError.data === "object"
    ? (dailySalesError.data as { message?: string; error_type?: string; status_code?: number })
    : { message: "An unexpected error occurred.", error_type: "Unknown", status_code: 500 };

    const errorDataMonthly = monthlyError && "data" in monthlyError && typeof monthlyError.data === "object"
    ? (monthlyError.data as { message?: string; error_type?: string; status_code?: number })
    : { message: "An unexpected error occurred.", error_type: "Unknown", status_code: 500 };


  const handleSelect = (label: string) => {
    setSelectedFilter(label);
    setShowDatePicker(false);
    setDropDown(false);
    handleIsOpenCloseMenuModal();
    console.log("Selected Filter:", label); // Logs the correct state
  };

  const handleDateSelection = (date: Date | null) => {
    if (date) {
      const selectedYear = date.getFullYear();
      const selectedMonth = date.getMonth() + 1; // Convert 0-based index to 1-based month (1-12)
      setMonth(selectedMonth);
      setYear(selectedYear);
      setSelectedFilter(`Monthly`);
  
      setShowDatePicker(false); // Close DatePicker
      setDropDown(false); // Close Dropdown

      handleIsOpenCloseMenuModal();
  
      console.log("Selected Month:", selectedMonth, "Year:", selectedYear);
    }
  };


  const handleCloseModal = () => {
    handleIsOpenCloseMenuModal(); // Close the modal
    // setMonthlySales(null); // Reset monthly sales data
    setMonth(null); // Reset month
    setYear(null); // Reset year
    setSelectedFilter(""); // Reset selected filter
  };

  const closeDropdown = useCallback(() => {
    setDropDown(false);
    setShowDatePicker(false);
  }, [setDropDown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown, closeDropdown]);

  return (
    <>
      <div className="relative z-50" ref={dropdownRef}>
        <div className="px-4 py-2 cursor-pointer border-r" onClick={handledropdownMenu}>
          <div className="flex justify-between items-center">
            <h5 className="font-Poppins text-[12px] text-[#333] text-opacity-85 flex">
              <BiIcons.BsFiletypePdf size={17} />
              <span className="pl-2"> Export PDF</span>
            </h5>
            <span className="pl-2 transition duration-800">{dropdown ? <RxIcons.RxCaretUp /> : <RxIcons.RxCaretDown />}</span>
          </div>
        </div>

        {dropdown && (
          <div className="absolute top-10 right-0 bg-white border shadow-lg font-Poppins w-full">
            {salesFilters.map((option) => (
              <div key={option.label} className="relative text-[13px] text-[#333] text-opacity-75" 
                  onMouseEnter={() => {
                    if (option.type === "monthly") {
                      setShowDatePicker(true);
                    }
                  }}
              >
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between" onClick={() => {handleSelect(option.label)}}>
                  {option.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {showDatePicker && dropdown && (
          <div className="absolute top-20 right-full bg-white">
            <DatePicker
              selected={null}
              onChange={handleDateSelection}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              inline
              className="py-2"
            />
          </div>
        )}
      </div>

      {/* Display sales data */}
      {
        selectedFilter === "Today" &&  
          (
            dailySales?.length ? (
              <SalesReportPDF
                open={open}
                handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
                title={`Daily Sales Report for ${format(new Date(), 'EEEE, dd MMMM yyyy')}`}
                salesData={dailySales}
              />
            ) : dailySalesError && (
              <EmptyResultModal 
                open={open}
                handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
                title={`NO_DAILY_SALES_RECORD`}
                errorData={errorData}
              />
            )             
        )
      }

      {
        selectedFilter === "Monthly" && open && (
          monthlyLoading ? (
            <div>Loading...</div> // Show loading state
          ) : monthlyError ? (
              <EmptyResultModal
              open={open}
              handleIsOpenCloseMenuModal={handleCloseModal}
              errorData={errorDataMonthly}
            />
            // Show error state
          ) : monthlySales?.length && (
            <SalesReportPDF
              open={open}
              handleIsOpenCloseMenuModal={handleCloseModal}
              title={`Monthly Sales Report for ${month}/${year}`}
              salesData={monthlySales}
              month={month}
              year={year}
            />
          ) 
        )
      }
    
    
    </>

      

  );
};

export default SalesFilterDatePicker
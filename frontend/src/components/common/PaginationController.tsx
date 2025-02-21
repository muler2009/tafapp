import React from 'react'
import * as MdIcons from 'react-icons/md'
import * as IoIcons from 'react-icons/io'


interface TableInstanceProps {
    table: any
}

const PaginationController = ({ table }: TableInstanceProps) => {
  return (
    <>
      {/* <div className="flex justify-center items-center gap-2"> */}
        <div className='flex space-x-3'>
          <div className='flex items-center gap-1'>
            <button 
              className={`px-2 py-2 border bg-gray-50 ${table.getCanPreviousPage() === true && 'btn-sm rounded-none bg-taf-color text-white cursor-pointer'}`} 
              onClick={() => table.firstPage()}  disabled={!table.getCanPreviousPage()}>
                <MdIcons.MdKeyboardDoubleArrowLeft />
            </button>

            <button 
              className={`px-2 py-2 border bg-gray-50 ${table.getCanPreviousPage() === true && 'btn-sm rounded-none bg-taf-color text-white cursor-pointer'}`} 
              onClick={() => table.previousPage()}  disabled={!table.getCanPreviousPage()}
            >
                <IoIcons.IoIosArrowBack />
            </button>
          </div>
          <div className="flex items-center gap-1 text-[13px] font-Poppins">
              <p className='font-Poppins'>
                Page <span>{table.getState().pagination.pageIndex + 1} of {' '}{table.getPageCount()}</span>
              </p> 
          </div>
          </div>
          <div className='flex items-center gap-1'>
            <button className={`px-2 py-2 border bg-gray-50 ${table.getCanNextPage() === true && 'btn-sm rounded-none bg-taf-color text-white cursor-pointer'}`} 
                onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                <IoIcons.IoIosArrowForward />
            </button>

            <button className={`px-2 py-2 border bg-gray-50 ${table.getCanNextPage() === true && 'btn-sm rounded-none bg-taf-color text-white cursor-pointer'}`} 
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}  disabled={!table.getCanNextPage()}>
                <MdIcons.MdKeyboardDoubleArrowRight />
            </button>
          </div>
      {/* </div> */}
     
    </>
     
    
  )
}

export default PaginationController

{/* */}

       
        
      
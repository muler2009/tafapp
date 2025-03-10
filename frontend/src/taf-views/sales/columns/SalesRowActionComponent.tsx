import React from 'react'
import { BottomTooltip } from '../../../components/reusable'
import * as CiIcons from 'react-icons/ci'
import { SalesAPIResponse } from '../../../interface/sales-interface'
import useUtils from '../../../hooks/useUtils'
import SalesReportPDF from '../sales-components/sales-pdf/SalesReportPDFModal'

interface SalesRowActionComponentInterface {
  rowData?: SalesAPIResponse;
}

const SalesRowActionComponent = ({rowData} : SalesRowActionComponentInterface) => {
    const {open, handleIsOpenCloseMenuModal} = useUtils()
  return (
    <>
      <BottomTooltip content={`View Sales Detail`}>
          <div className={`w-9 h-9 flex justify-center items-center text-opacity-70 hover:bg-gray-200 rounded-full py-[10px]`} onClick={handleIsOpenCloseMenuModal} >
              <CiIcons.CiSaveDown2 size={17}/>
          </div>
      </BottomTooltip>

      {/* <SalesReportPDF
        rowData={rowData}
        open={open}
        handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
        title={`name`}
      
      /> */}
    
    
    </>
  )
}

export default SalesRowActionComponent
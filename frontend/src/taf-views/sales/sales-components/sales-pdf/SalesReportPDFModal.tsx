import React from 'react'
import { SalesAPIResponse } from '../../../../interface/sales-interface'
import { ModalWrapper, ModalBody, ModalContainer, ModalHeader } from '../../../../components/reusable';
import * as VscIcons from 'react-icons/vsc'
import { PDFViewer, Page, Document } from '@react-pdf/renderer';
import { styles, tableStyles } from '../../../../constants/style';
import SalesPDF from './SalesPDF';
import { ReportHeader, SalesReportTitle, TableHead, TableBody } from './SalesReportPDFComponents';

interface SalesReportPDFModalInterface {
  salesData?: SalesAPIResponse[],
  open: boolean;
  handleIsOpenCloseMenuModal: () => void; 
  title: string;
}

const SalesReportPDF = ({salesData, open, handleIsOpenCloseMenuModal, title}: SalesReportPDFModalInterface) => {
  return (
    open ? (
      <ModalWrapper>
        <ModalContainer className={`w-[1000px] flex flex-col relative shadow-2xl rounded-[3px]`} onClick={handleIsOpenCloseMenuModal}>
          <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b bg-red-500 text-[#333]'>
              <p className='font-Poppins p-left px-5 text-[14px] flex-grow text-[#fff] '>{title}</p>
              <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-md hover:bg-gray-100 hover:text-red-600 text-[#333]" onClick={handleIsOpenCloseMenuModal} > 
                  <VscIcons.VscClose size={15} />
              </div>
          </ModalHeader>

          <ModalBody className=''>
            <PDFViewer width="1000" height="650" className="flex justify-center" >
                <Document>
                  <Page size="A4" style={tableStyles.page}>
                    <SalesPDF salesData={salesData}  />       
                  </Page>
                </Document>     
            </PDFViewer>
          </ModalBody>
    </ModalContainer>

      </ModalWrapper>

    ) : null
  )
}

export default SalesReportPDF
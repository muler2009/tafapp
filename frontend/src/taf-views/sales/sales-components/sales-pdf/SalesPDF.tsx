import React from 'react'
import { SalesAPIResponse } from '../../../../interface/sales-interface'
import { ReportHeader } from '../../../machine/machine-mini-component/InvoiceComponents'
import { PDFFooter, PDFHeader, PDFTableComponent } from './SalesReportPDFComponents'

interface SalesPDFInterface {
  salesData: any
  month: any;
  year: any;
}

const SalesPDF = ({salesData, month, year}: SalesPDFInterface) => {
  return (
    <>
        <PDFHeader month={month} year={year}/>
        <PDFTableComponent salesData={salesData} />
        <PDFFooter />
    </>

  )
}

export default SalesPDF
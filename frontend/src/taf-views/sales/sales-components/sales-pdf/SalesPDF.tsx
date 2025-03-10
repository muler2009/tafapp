import React from 'react'
import { SalesAPIResponse } from '../../../../interface/sales-interface'
import { ReportHeader } from '../../../machine/machine-mini-component/InvoiceComponents'
import { PDFFooter, PDFHeader, PDFTableComponent, SalesReportTitle, TableBody, TableHead } from './SalesReportPDFComponents'

interface SalesPDFInterface {
  salesData: any
}

const SalesPDF = ({salesData}: SalesPDFInterface) => {
  return (
    <>
        {/* <ReportHeader />
        <SalesReportTitle /> */}
        {/* <TableHead />
        <TableBody salesData={salesData} /> */}
        <PDFHeader />
        <PDFTableComponent salesData={salesData} />
        <PDFFooter />
    </>

  )
}

export default SalesPDF
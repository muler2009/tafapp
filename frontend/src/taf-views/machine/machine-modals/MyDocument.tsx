import React from 'react'
import * as VscIcons from 'react-icons/vsc'
import { ModalBody, ModalContainer, ModalHeader, ModalFooter } from '../../../components/reusable'
import { Div } from '../../../components/reusable/StyledComponent'
import { Page, Text, View, Document, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';
import { ModalPropsInterface } from '../../../interface/modal-interface';
import {styles} from '../../../constants/style'
import logo from '../../../assets/images/taf-logo.png'
import InvoiceComponents from '../machine-mini-component/InvoiceComponents';

const MyDocument = ({onRequestClose, title, isOpen, rowData}: ModalPropsInterface) => {
  return (
    <ModalContainer className={`w-[1000px] flex flex-col relative shadow-2xl rounded-[3px]`} onClick={onRequestClose}>
      <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b bg-red-500 text-[#333]'>
          <p className='font-Poppins p-left px-5 text-[14px] flex-grow text-[#fff] '>{title}</p>
          <Div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-md hover:bg-gray-100 hover:text-red-600 text-[#333]" onClick={onRequestClose} > 
              <VscIcons.VscClose size={15} />
          </Div>
      </ModalHeader>

      <ModalBody className=''>
        <PDFViewer width="1000" height="650" className="flex justify-center" >
            <Document>
              <Page size="A4" style={styles.page}>
                <InvoiceComponents rowData={rowData} />         
              </Page>
            </Document>     
        </PDFViewer>
      </ModalBody>
</ModalContainer>
  )
}

export default MyDocument
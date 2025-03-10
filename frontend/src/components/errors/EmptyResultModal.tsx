import React from 'react'
import { ExportSalesModalInterface } from '../../interface/modal-interface'
import { ModalWrapper, ModalHeader, ModalBody, ModalContainer, ModalFooter } from '../reusable'
import {format} from 'date-fns'
import * as VscIcons from 'react-icons/vsc'
import * as BiIcons from "react-icons/bi";

const EmptyResultModal = ({open, handleIsOpenCloseMenuModal, title, errorData}: ExportSalesModalInterface) => {

  return (
    open ? (
        <ModalWrapper>
        <ModalContainer className={`w-[25%] mx-auto flex flex-col relative top-[20%] shadow-2xl rounded-[3px] bg-taf-color p-[2px]`}>
            <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b bg-gray-50 text-balck'>
              <h1 className='font-Poppins text-left px-5 text-[14px] flex-grow font-semibold text-red-500'>ERROR: {errorData?.error_type}</h1>
              <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-taf-color hover:text-white text-[#333]" onClick={handleIsOpenCloseMenuModal}> 
                <VscIcons.VscClose size={15} />
              </div>
            </ModalHeader>
            <ModalBody className='bg-gray-50 py-2 px-5'>
              <div className={`flex space-x-4 justify-start items-start`}>
                <div className={`py-1 text-6xl text-red-500`}>
                  <BiIcons.BiSolidErrorAlt />
                </div>
                <div className={`flex-grow py-1 flex flex-col space-y-1`}>
                  <p className={`font-Poppins text-[13px]`}>{format(new Date(), 'EEEE, dd MMMM yyy')}</p>
                  <p className={`font-Poppins text-[15px] text-[#333] text-opacity-75`}>{errorData?.message}</p>
                  
                  </div>
              </div>  
            </ModalBody>
            <ModalFooter className={`bg-gray-50 pt-2 pb-4 flex justify-end pr-5`}>
              <button className='btn-sm px-10 text-sm py-1 shadow-md border hover:bg-red-400 hover:text-white' onClick={handleIsOpenCloseMenuModal}>Ok</button>
            </ModalFooter>
          </ModalContainer>
        </ModalWrapper>
    ): null
   
  )
}

export default EmptyResultModal
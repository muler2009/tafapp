import React from 'react'
import { Text, Div } from '../../../components/reusable/StyledComponent'
import { ExportSalesModalInterface, ModalComponentPropsInterface } from '../../../interface/modal-interface'
import { ModalBody, ModalContainer, ModalHeader, ModalWrapper } from '../../../components/reusable'
import * as VscIcons from 'react-icons/vsc'



const DailySalesModal = ({open, handleIsOpenCloseMenuModal, title, dailySales, dailySalesError }: ExportSalesModalInterface) => {
  console.log(dailySalesError)
  return (
    open ? (
      <ModalWrapper>
        <ModalContainer className={`w-[40%] mx-auto flex flex-col relative top-[20%] shadow-2xl rounded-[3px]`}>
            <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b bg-gray-50 text-white'>
              <Text className='font-Poppins text-left px-5 text-[14px] flex-grow '>{title}</Text>
              <Div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-md hover:bg-gray-100 hover:text-red-600 text-[#333]" onClick={handleIsOpenCloseMenuModal} > 
                <VscIcons.VscClose size={15} />
              </Div>
            </ModalHeader>
            <ModalBody className='bg-gray-50'>
              {
                dailySales?.map((daily, index) => {
                  return(
                    <div className='' key={index}>
                      {daily.machine}
                    </div>
                  )
                })
              }

{/* {dailySalesError && "data" in dailySalesError && (
      <div className="bg-red-100 text-red-700 p-2 rounded">
        <p><strong>Error:</strong> {dailySalesError?.data?.message}</p>
      </div>
    )} */}
            </ModalBody>
          </ModalContainer>
        </ModalWrapper>
    ): null
    
  )
}

export default DailySalesModal
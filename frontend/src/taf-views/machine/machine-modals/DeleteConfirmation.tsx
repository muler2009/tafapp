import React from 'react'
import { ModalPropsInterface } from '../../../interface/modal-interface'
import { ModalContainer, ModalBody, ModalHeader, ModalFooter } from '../../../components/reusable'
import { Div, Text } from '../../../components/reusable/StyledComponent'
import * as VscIcons from 'react-icons/vsc'
import * as PiIcons from 'react-icons/pi'
import * as MdIcons from "react-icons/md";
import { format } from 'date-fns'
import * as BsIcons from "react-icons/bs";

import { useDeleteMachineInstanceMutation } from '../../../services/machineAPI'

const DeleteConfirmation = ({onRequestClose, title, isOpen, rowData}: ModalPropsInterface) => {

    const [deleteMachineInstance] = useDeleteMachineInstanceMutation()

    const onDeleteClicked = async (machine_id: any) => {
      try {
          await deleteMachineInstance(machine_id).unwrap();
          console.log(`Machine instance with ID ${machine_id} deleted successfully.`);
      } catch (error) {
          console.error("Error deleting machine instance:", error);
      } finally {
          onRequestClose();
      }
  };

    
  return (
    <ModalContainer className={`w-[30%] mx-auto flex flex-col relative top-[20%] shadow-2xl rounded-[3px] animate-fade-in-up`}>
        <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b bg-gray-100 text-[#333]'>
            <Text className='font-Poppins text-left px-5 text-[14px] flex-grow text-[#333] '>{title}</Text>
            <Div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-md hover:text-black hover:bg-gray-100 text-[#333]" onClick={onRequestClose} > 
                <VscIcons.VscClose size={15} />
            </Div>
        </ModalHeader>
        <ModalBody className='px-10 py-2 bg-gray-50 font-Rubik'>
          <div className={`flex space-x-10 justify-start items-center`}>
            <BsIcons.BsExclamationTriangle size={50} color='red' opacity={0.7} />
            <div className={`flex flex-col space-y-0 py-4`}>
              <div className={`flex space-x-5`}>
                <div className={`flex flex-col space-y-1`}>
                  <Text>You are removing {rowData?.machine_name} with {rowData?.machine_code} code</Text>
                  {/* <Text>{format(rowData?.registration_date || new Date(), 'EEEE, dd MMM yyyy' )}</Text> */}
                </div>
              </div>
              <h6 className={``}>Are you sure you want to delete ?</h6>
            </div>           

          </div>
        </ModalBody>
        <ModalFooter className='flex justify-end items-center space-x-3 py-3 pr-5 cursor-pointer bg-[#fff] rounded-b-[4px] border-t'>
            <button className='btn-md py-1 border px-10 hover:bg-red-500 hover:text-white hover:ring-0' onClick={() => onDeleteClicked(rowData?.machine_id)}>Yes</button>
            <button className='btn-md py-1 border px-10' onClick={onRequestClose}>No</button>
        </ModalFooter>
    </ModalContainer>
  )
}

export default DeleteConfirmation
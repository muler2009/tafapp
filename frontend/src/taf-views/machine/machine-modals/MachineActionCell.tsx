import React from 'react'
import { MachineAPIResponse } from '../../../interface/machine-interface'
import { FlexBox } from '../../../components/reusable/StyledComponent'
import * as BsIcons from 'react-icons/bs'
import * as TbIcons from "react-icons/tb";
import useUtils from '../../../hooks/useUtils';
import {ModalBody, ModalContainer, ModalWrapper, ModalHeader, BottomTooltip}  from '../../../components/reusable';
import { Text, Div } from '../../../components/reusable/StyledComponent';
import * as VscIcons from 'react-icons/vsc'
import { ModalComponentPropsInterface } from '../../../interface/modal-interface';
import { actions } from '../../../constants/actions';
import MachineActionModalStructure from './MachinActionModalStructure';

interface MachineActionCellInterface {
    rowData: MachineAPIResponse
}

const MachineActionCell = ({rowData}: MachineActionCellInterface) => {
  const {isOpen, handleIsOpenCloseMenu} = useUtils()
  return (
    <>
      <FlexBox className={`group-hover:visible invisible flex justify-start`}>
        {
          actions?.map((action, index) => {
            return(
              <BottomTooltip content={`${action.label}`}>
                 <div className={`w-9 h-9 flex justify-center items-center text-opacity-70 hover:bg-gray-200 ${action.color} rounded-full`} onClick={()=>handleIsOpenCloseMenu(action.label)}>
                    {action.icon}
                  </div>
                
              </BottomTooltip>
            )
          })
        }
      </FlexBox>

        {
          Object.keys(isOpen).map(link_identifier => 
            isOpen[link_identifier] && (
              <MachineActionModalStructure 
                key={link_identifier}
                isOpen={isOpen[link_identifier]}
                onRequestClose={() => handleIsOpenCloseMenu(link_identifier)}
                title={link_identifier}
                link_identifier={link_identifier}
                rowData={rowData}
              />
            )
          )}

     
    </>
  )
}

export default MachineActionCell


{/* <DeleteConfirmation 
open={open}
handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
title={`Deleteing Machine`}
rowData={rowData}
/> */}


export interface DeleteConfirmationInterface {
  open: boolean;
  handleIsOpenCloseMenuModal: () => void 
  title: string;
  rowData: MachineAPIResponse

}

// const DeleteConfirmation = ({open, handleIsOpenCloseMenuModal, title, rowData}: DeleteConfirmationInterface) => {
//   return(
//     open ? (
//       <ModalWrapper>
//         <ModalContainer className={`w-[30%] mx-auto bg-gray-50 flex flex-col relative top-[20%] shadow-2xl rounded-[3px]`}>
//           <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b'>
//               <Text className='font-Poppins text-left px-5 text-[14px] flex-grow text-[#333]'>{title}</Text>
//               <Div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-red-400 hover:text-white text-[#333]"  > 
//                   <VscIcons.VscClose size={15}  onClick={handleIsOpenCloseMenuModal} />
//               </Div>
//           </ModalHeader>
//           <ModalBody className={`px-5 h-[30vh]`}>
//             {rowData.machine_name}
//           </ModalBody>
//         </ModalContainer>
//       </ModalWrapper>

//     ): null
//   )
// }
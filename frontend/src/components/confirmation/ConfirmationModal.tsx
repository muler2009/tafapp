import React from 'react'
import useLogout from '../../login/hooks/useLogout'
import { ModalBody, ModalContainer, ModalHeader, ModalFooter, ModalWrapper } from '../reusable'
import { Text, FlexBox } from '../reusable/StyledComponent'
import * as VscIcons from 'react-icons/vsc'
import { APIInterface } from '../../interface/login-interface'
import { SuccessMessageInterface } from '../../interface/confirmation-interface'
import * as IoIcons from "react-icons/io";




const ConfirmationModal = ({success, successMessage, setSuccess}: SuccessMessageInterface) => {
    const {onUserLogoutClicked} = useLogout()
    

  return (
    success ? (
        <ModalWrapper>
            <ModalContainer className='w-[25%] mx-auto my-10 flex flex-col border-[1px] border-[#ddd] shadow-xl rounded-[5px] relative top-[25%]'>
                <ModalHeader className='py-[10px] px-5 flex justify-between items-center cursor-pointer bg-[#e6e6e6] rounded-t-[4px] border-b border-gray-400 border-opacity-50'>
                    <Text className=' text-[15px] font-Poppins flex justify-center items-center'>
                        <span className='mr-2 text-red-700 font-bold'>
                            {/* <Text>{successMessage?.error_type}</Text> */}
                            <Text className={`text-green-500`}>{successMessage?.error_type}</Text>
                        </span>
                    </Text>
                </ModalHeader>
                <ModalBody className='px-5 py-2 bg-gray-50 h-full'>
                    <FlexBox className='px-3 py-2 flex space-x-2 items-center'>
                        <IoIcons.IoIosCheckmarkCircle size={50}  className={`text-green-500`} />
                        <Text className={`text-sm `}>
                            {successMessage?.message}
                        </Text>
                    </FlexBox>
                </ModalBody>
                <ModalFooter className='flex justify-end items-center py-3 pr-5 cursor-pointer bg-[#fff] rounded-b-[4px] border-t'>
                    <button className='btn-sm ring-1 px-10' onClick={onUserLogoutClicked}>Ok</button>
                    <></>
                </ModalFooter>
            </ModalContainer>
        </ModalWrapper>

    ) : null
  )
}

export default ConfirmationModal
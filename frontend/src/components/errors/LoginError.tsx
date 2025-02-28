import React from 'react'
import * as VscIcons from 'react-icons/vsc'
import * as BiIcons from 'react-icons/bi'
import * as FaIcons from 'react-icons/fa'
import * as Io from 'react-icons/io'
import { ModalBody, ModalHeader, ModalFooter, ModalWrapper, ModalContainer } from '../reusable'
import { FlexBox, FlexBoxInner, Text } from '../reusable/StyledComponent'
import { ErrorResponseInterface } from '../../interface/error_interface'
import { MdError } from "react-icons/md";
import useLogin from '../../login/hooks/useLogin'
import { useLoginMutation } from '../../services/loginAPI'

interface LoginFailedModalInterface {
    loginErrorMessage: ErrorResponseInterface | null;
    loginFailed: boolean;
    setLoginFailed: React.Dispatch<React.SetStateAction<boolean>>
    
}

export const LoginErrorMessageModal = ({loginErrorMessage, loginFailed, setLoginFailed}: LoginFailedModalInterface ) => {
    return (
        loginFailed ? (
            <ModalWrapper>
                <ModalContainer className='w-[35%] mx-auto my-10 flex flex-col border-[1px] border-[#ddd] shadow-xl rounded-md relative top-[25%]'>
                   <ModalHeader className='py-[10px] px-5 flex justify-between items-center cursor-pointer bg-[#e6e6e6] border-b border-gray-400 border-opacity-50'>
                        <Text className='font-semibold text-red-600'>ERROR</Text>                        
                        <VscIcons.VscClose size={20} onClick={() => setLoginFailed(prevState => !prevState)} />
                   </ModalHeader>
                   <ModalBody className='px-5 py-5 bg-[#f5f5f5] h-full'>
                        <FlexBox className='px-3 pt-5 pb-1 flex space-x-3'>
                            <FlexBoxInner>
                                <MdError size={70} color='red'/>
                            </FlexBoxInner>
                            <FlexBoxInner className='flex flex-col space-y-1 items-start justify-center'>
                                <Text className={`font-semibold text-[#333] text-[16px]`}>
                                    {loginErrorMessage?.error_type}
                                </Text>
                                <Text className='text-[14px] text-[#333] text-opacity-75'>{loginErrorMessage?.message}</Text>
                                <Text>{loginErrorMessage?.status_code}</Text>

                            </FlexBoxInner>
                        </FlexBox>
                   </ModalBody>
                   <ModalFooter className='flex justify-end items-center space-x-3 py-3 pr-5 cursor-pointer bg-[#f5f5f5]'>
                        <button className='btn-sm ring-1 px-10' onClick={() => setLoginFailed(prevState => !prevState)}>Ok</button>
                    </ModalFooter>
                </ModalContainer>
            </ModalWrapper>
        ): null
      )
}


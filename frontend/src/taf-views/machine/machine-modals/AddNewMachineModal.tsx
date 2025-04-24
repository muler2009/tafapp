import React from 'react'
import { ModalComponentPropsInterface, ModalProps } from '../../../interface/modal-interface'
import { ModalBody, ModalContainer, ModalFooter, ModalHeader, ModalWrapper } from '../../../components/reusable'
import { Text, Div, FlexBoxInner, FlexBox } from '../../../components/reusable/StyledComponent'
import * as VscIcons from 'react-icons/vsc'
import * as AiIcons from 'react-icons/ai'
import InputWithDesc from '../../../components/reusable/InputWithDesc'
import { useGeFuelTypeQuery } from '../../../services/fuelTypeAPI'
import useMachine from '../hooks/useMachine'
import { useAddNewMachineMutation } from '../../../services/machineAPI'
import useErrorState from '../../../hooks/useError'
import ErrorNotifierModal from '../../../components/errors/ErrorNotifierModal'

const AddNewMachineModal = ({open, handleIsOpenCloseMenuModal, title}: ModalComponentPropsInterface) => {
    const {data: fuel_type, isSuccess} = useGeFuelTypeQuery()
    const {machineData, handleMachineInputChanges, canSubmit} = useMachine()
    const [addNewMachine, {isError, error}] = useAddNewMachineMutation()
    const {setErrorMessage, setErrors, setTriggerMessageModal, triggerMessageModal, errorMessage} = useErrorState()


    const onMachineSaveClicked = async() => {
        try{
            const response = await addNewMachine(machineData).unwrap()
            if(response.status_code === 201){
              handleIsOpenCloseMenuModal()
            }
         }catch(error: any){
             console.log(error)
             if(!error) {
               console.log(error)
             } else if(error.data.status_code === 409 ){
               setErrorMessage({
                 error_type: error.data?.error_type,
                 message: error.data?.message,
                 status_code: error.status_code
               });
               setErrors(true);
               setTriggerMessageModal(prev => !prev);
             } else if(error.data.status_code === 400 ){
               setErrorMessage({
                 error_type: error.data?.error_type,
                 message: error.data?.message,
                 status_code: error.status_code
               });
               setErrors(true);
               setTriggerMessageModal(prev => !prev);
             }
           }
    }

  return (
    open ? (
        <ModalWrapper>
            <ModalContainer className={`w-[30%] mx-auto bg-gray-50 flex flex-col relative top-[20%] shadow-2xl rounded-[3px] animate-fade-in-up`}>
                <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b'>
                    <Text className='font-Poppins text-left px-5 text-[14px] flex-grow text-[#333]'>{title}</Text>
                    <Div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-red-400 hover:text-white text-[#333]" onClick={handleIsOpenCloseMenuModal} > 
                        <VscIcons.VscClose size={15} />
                    </Div>
                </ModalHeader>
                <ModalBody className={`px-5 h-[30vh]`}>
                    <FlexBox className={`px-5 py-5 flex flex-col space-y-2`}>
                       <InputWithDesc 
                            label='Machine Name'
                            type='text'
                            id='machine_name_input'
                            placeholder='Enter machine name'
                            className='input-md text-[13px]'
                            name={`machine_name`}
                            value={machineData?.machine_name}
                            onChange={handleMachineInputChanges}
                            
                       />
                        <InputWithDesc 
                            label='Machine Code'
                            type='text'
                            id='machine_code_input'
                            placeholder={`Enter machine Code`}
                            className={`input-md text-[12px]`}
                            desc={`example: MAC-002`}
                            name={`machine_code`}
                            value={machineData?.machine_code}
                            onChange={handleMachineInputChanges}
                       />

                         <Div className='relative'>
                            <select 
                                id={`label_input`}
                                name={`nedaj_type`}
                                className="select-md rounded-sm font-Poppins py-2 w-full text-[12px]" 
                                value={machineData?.nedaj_type} 
                                onChange={handleMachineInputChanges}         
                            >
                                <option value="" disabled><p className='text-[#333] text-opacity-50'>--Select Fuel type--</p></option>
                                {
                                    isSuccess ? (
                                            fuel_type?.map((fuel, index) => {
                                                return(
                                                    <option key={index} value={fuel.type_name}>{fuel.type_name}</option>
                                                )
                                            })
                                        
                                    ) : (
                                        <Text>Empty</Text>
                                    )
                                }
                            
                            </select>   
                            <span className='flex justify-center items-center absolute top-0 border right-0 text-gray-500 bg-gray-50 h-full w-[30px] pointer-events-none '>
                                <AiIcons.AiOutlineCaretDown  />
                            </span>
                        </Div>
                    </FlexBox>
                </ModalBody>
                <ModalFooter className={`flex justify-end pr-10 border-t py-2`}>
                    <button className={`px-5 py-2 text-[12px] rounded-md bg-taf-color text-white disabled:bg-gray-50 disabled:text-gray-50`} disabled={!canSubmit} onClick={onMachineSaveClicked} >
                        Save
                    </button>
                </ModalFooter>
            </ModalContainer>

            <ErrorNotifierModal 
              triggerMessageModal={triggerMessageModal} 
              errorMessage={errorMessage}
              setTriggerMessageModal={setTriggerMessageModal}
            />

        </ModalWrapper>
  ) : null
)
}

export default AddNewMachineModal
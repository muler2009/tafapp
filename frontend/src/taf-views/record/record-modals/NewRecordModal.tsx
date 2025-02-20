import React from 'react'
import * as VscIcons from 'react-icons/vsc'
import * as AiIcons from 'react-icons/ai'
import { ModalComponentPropsInterface, ModalProps } from '../../../interface/modal-interface'
import { ModalBody, ModalContainer, ModalFooter, ModalHeader, ModalWrapper } from '../../../components/reusable'
import { Text, Div, FlexBoxInner, FlexBox } from '../../../components/reusable/StyledComponent'
import { useGetMachinesQuery } from '../../../services/machineAPI'
import InputWithDesc from '../../../components/reusable/InputWithDesc'
import useRecord from '../hooks/useRecord'
import { useAddNewReadingMutation } from '../../../services/readingAPI'
import useErrorState from '../../../hooks/useError'
import ErrorNotifierModal from '../../../components/errors/ErrorNotifierModal'

const NewRecordModal = ({open, handleIsOpenCloseMenuModal, title}: ModalComponentPropsInterface) => {
    const {data: taf_machine} = useGetMachinesQuery()
    const {readingData, handleRecordInputChange, canSubmit} = useRecord()
    const [addNewReading] = useAddNewReadingMutation()
    const {setErrorMessage, setErrors, setTriggerMessageModal, triggerMessageModal, errorMessage} = useErrorState()

    
    const onReadingSubmitClicked = async() => {
        try{
           const response = await addNewReading(readingData).unwrap()
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
            <ModalContainer className={`w-[30%] mx-auto bg-gray-50 flex flex-col relative top-[20%] shadow-2xl rounded-[3px]`}>
                <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b'>
                    <Text className='font-Poppins text-left px-5 text-[14px] flex-grow text-[#333]'>{title}</Text>
                    <Div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-red-400 hover:text-white text-[#333]" onClick={handleIsOpenCloseMenuModal} > 
                        <VscIcons.VscClose size={15} />
                    </Div>
                </ModalHeader>
                <ModalBody className='px-5 h-[25vh] py-2'>
                    <FlexBox className='px-5 flex flex-col space-y-2'>
                        <label className='text-[13px] py-3'>Select Specific Machine:</label>
                            <Div className='relative'>
                                <select 
                                    id={`label_input`}
                                    className={`select-md rounded-sm font-Poppins py-2 w-full text-[12px]`} 
                                    name={`machine`}
                                    value={readingData?.machine} 
                                    onChange={handleRecordInputChange}         
                                >
                                     <option >--Select Machine --</option>
                                  {
                                        
                                        taf_machine?.map((machine, index) => {
                                            return(
                                                <option className='text-[#333] bg-gray-100' key={index}>
                                                    {machine.machine_name} 
                                                </option>
                                            )
                                            }
                                        )
                                                                       
                                  }
                                
                                </select>   
                                <span className='flex justify-center items-center absolute top-0 border right-0 text-gray-500 bg-gray-50 h-full w-[30px] pointer-events-none '>
                                    <AiIcons.AiOutlineCaretDown  />
                                </span>
                            </Div>

                            <Div className=''>
                                <InputWithDesc 
                                    label='New Reading *'
                                    type='number'
                                    id='new_reading_input'
                                    name='new_record'
                                    placeholder='Enter New Machine Reading'
                                    className='input-md text-[13px]'
                                    desc="Add new reading for the coresponding machine"
                                    value={readingData?.new_record}
                                    onChange={handleRecordInputChange}
                                
                                />
                            </Div>
                    </FlexBox>
                </ModalBody>
                 <ModalFooter className={`flex justify-end pr-10 border-t py-2`}>
                    <button className={`px-5 py-2 text-[12px] rounded-md bg-taf-color text-white disabled:bg-gray-100`} onClick={onReadingSubmitClicked} disabled={!canSubmit}>
                        Submit
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

export default NewRecordModal
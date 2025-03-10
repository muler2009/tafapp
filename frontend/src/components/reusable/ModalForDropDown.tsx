import React from 'react'
import ModalWrapper from './ModalWrapper';
import { ModalContentInterface } from '../../interface/modal-interface';
import ChangePasswordComponent from '../../login/login_mini_components/ChangePasswordComponent';
import { ModalPropsInterface } from '../../interface/modal-interface';



const ModalForDropDown = ({isOpen, onRequestClose, title, link_identifier}: ModalPropsInterface) => {
    const modalContent: ModalContentInterface  = {
        Passowrd: <ChangePasswordComponent isOpen={isOpen} onRequestClose={onRequestClose} title={title} />,
        // Configurations: <ChangePasswordComponent isOpen={isOpen} onRequestClose={onRequestClose} title={title} />,
        
        defaultKey: <div>No content available</div>
    };

    const safeLinkIdentifier = link_identifier ?? "defaultKey";

    return (
        isOpen ? (
            <ModalWrapper>
                {modalContent[safeLinkIdentifier]}
            </ModalWrapper>
        ) : null
    
      )
    }


export default ModalForDropDown
import React from 'react'
import { ModalContentInterface, ModalPropsInterface } from '../../../interface/modal-interface';
import { ModalWrapper } from '../../../components/reusable';
import DeleteConfirmation from './DeleteConfirmation';
import MyDocument from './MyDocument';

const MachineActionModalStructure = ({isOpen, onRequestClose, title, link_identifier, rowData}: ModalPropsInterface) => {
    const modalContent: ModalContentInterface  = {
        Delete: <DeleteConfirmation isOpen={isOpen} onRequestClose={onRequestClose} title={title} rowData={rowData} />,
        Download: <MyDocument isOpen={isOpen} onRequestClose={onRequestClose} title={title} rowData={rowData}  />,
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

export default MachineActionModalStructure
import { JSX } from "react";

export interface ModalProps {
    children: React.ReactNode;
    className?: string;
}

export interface ModalComponentPropsInterface {
    open: boolean;
    handleIsOpenCloseMenuModal: () => void;
    title: string;   
    onClose?: () => void
}

export interface ModalContent {
    [key: string]: JSX.Element;
  }

  export interface RoleModalPropsInterface {
    onRequestClose: () => void
    isOpen: boolean
    title: string;
    link_identifier?: string | undefined;
}
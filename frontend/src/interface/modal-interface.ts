export interface ModalProps {
    children: React.ReactNode;
    className?: string;
}

export interface ModalComponentPropsInterface {
    open: boolean;
    handleIsOpenCloseMenuModal: () => void;
    title: string;   
}
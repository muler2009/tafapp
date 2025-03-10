import { JSX } from "react";
import { MachineAPIResponse } from "./machine-interface";
import { SalesAPIResponse } from "./sales-interface";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export interface ModalProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void
}

export interface ModalComponentPropsInterface {
    open: boolean;
    handleIsOpenCloseMenuModal: () => void;
    title: string;   
    onClose?: () => void
}

export interface NotFoundErrorInterface {
    message?: string;
    error_type?: string;
    status_code?: number;
}

export interface ExportSalesModalInterface {
    open: boolean;
    handleIsOpenCloseMenuModal: () => void;
    title?: string;   
    dailySales?: SalesAPIResponse[] | undefined
    dailySalesError?: FetchBaseQueryError | SerializedError | undefined
    monthlySales?: FetchBaseQueryError | SerializedError | undefined
    errorData?: NotFoundErrorInterface;
    errorDataMonthly?: NotFoundErrorInterface

}

export interface ModalContentInterface {
    [key: string]: JSX.Element;
  }

  export interface ModalPropsInterface {
    onRequestClose: () => void
    isOpen: boolean
    title: string;
    link_identifier?: string | undefined;
    rowData?: MachineAPIResponse;
}
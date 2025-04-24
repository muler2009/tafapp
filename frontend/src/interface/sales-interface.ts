import { ModalComponentPropsInterface } from "./modal-interface";
import { BaseRecord } from "./table-interface";

export interface SalesInformationInterface extends BaseRecord {
    sales_id: string;
    machine: string;
    record : string;
    unit_price: number; 
    sold_qty: number
    sold_in_money: number;
    created_at: string; 
    total_sold_qty?: number,
    total_sales?: number,    
}

export interface SalesAPIResponse extends SalesInformationInterface {
    status_code?: number;
    message?: string;
    error_type?: string;
    detail?: string;
}
export interface SummaryAPIResponse {
    fuel_type: string;
    total_sold_qty: number;
    total_sales: number;
    unit_price: number;
}

export type SalesAPIResponseInterfce =
  | SalesInformationInterface[] // success
  | SalesAPIResponse; // no data / error

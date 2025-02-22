import { BaseRecord } from "./table-interface";

export interface SalesInformationInterface extends BaseRecord {
    sales_id: string;
    machine: string;
    record : string;
    unit_price: number; 
    sold_qty: number
    sold_in_money: number;
    created_at: string; 
}
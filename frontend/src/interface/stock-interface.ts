import { BaseRecord } from "./table-interface";

export interface StockInterface extends BaseRecord{
    nedaj_type: string; 
    total_liters: number; 
    unit_price: number; 
    prev_qty?:number; 
    sold_qty?: number; 
    remaining?: number;
    stocked_date?: string 
}

export interface StockAPIInterface extends StockInterface{
    stock_id: string,
    status_code: number;
    status_text: string;
}
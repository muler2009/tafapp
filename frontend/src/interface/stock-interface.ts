export interface StockInterface {
    nedaj_type: string; 
    total_liters: number; 
    unit_price: number; 
    prev_qty:number; 
    sold_qty: number; 
    remaining: number;
    stocked_date: string 
}

export interface StockAPIInterface extends StockInterface{
    stock_id: string
}
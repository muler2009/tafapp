export interface ReadingInterface {
    machine: string; 
    new_record: number;
    previous_record?: number;
    record_date?: string 
    record_update?: string; 
}


export interface ReadingAPIInterface extends ReadingInterface {
    record_id: string;
    status_code: number;
}


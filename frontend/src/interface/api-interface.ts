import { MachineAPIResponse } from "./machine-interface";

export interface AllAPIInterface extends MachineAPIResponse  {
    status_code: number;
    error_type: string;
    
}
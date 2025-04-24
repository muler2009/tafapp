import { BaseRecord } from "./table-interface";

export interface MachineInterface extends BaseRecord{
    machine_name: string;
    machine_code: number;
    registration_date?: string;
    nedaj_type: string;
}

export interface FuelTypeAPIInterface {
    type_id: string;
    type_name: string;
}

export interface MachineAPIResponse extends MachineInterface {
     machine_id?: string;
     status_code?: number;
     message?: string;
     error_type?: string;
     detail?: string;
}

export type MachineAPIResponseInterfce = 
  | MachineInterface[] // success
  | MachineAPIResponse; // no data / error
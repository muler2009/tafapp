export interface MachineInterface {
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
     machine_id: string;
     status_code: number;
}
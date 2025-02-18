export interface MachineInterface {
    machine_name: string;
    machine_code: number;
    registration_date: string;
    nedaj_type: string;
}

export interface MachineAPIResponse extends MachineInterface {
     machine_id: string;
}
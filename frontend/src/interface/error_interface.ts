export interface ErrorResponseInterface {
    error_type: string;
    message: string;
    status_code: number;
  }

export interface ErrorNotifierModalInterface {
    triggerMessageModal: boolean;
    errorMessage: ErrorResponseInterface | null;
    setTriggerMessageModal: React.Dispatch<React.SetStateAction<boolean>>
}
  
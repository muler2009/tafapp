import { APIInterface } from "./login-interface";

export interface SuccessMessageInterface {
    success: boolean,
    successMessage: APIInterface | null;
    setSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
    
}


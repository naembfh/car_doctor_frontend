import { Service } from "./serviceTypes";
import { Slot } from "./slotTypes";
export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  }

export interface Booking {
    _id: string;
    customer?: User; 
    service: Service;  
    slot: Slot;         
  }
  
  
  export interface BookingsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Booking[]; 
  }
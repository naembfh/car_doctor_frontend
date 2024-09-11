import { Service } from "./Servicetypes";
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
    customer?: User; // Customer details
    service: Service;   // Service details
    slot: Slot;         // Slot details
  }
  
  // Define the response type for multiple bookings
  export interface BookingsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Booking[]; // List of bookings
  }
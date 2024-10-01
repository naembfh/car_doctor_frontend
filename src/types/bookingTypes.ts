import { Service } from "./serviceTypes";
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
}


export interface Booking {
  _id: string;
  serviceId: Service | string;  
  slotId: string;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: string;
  registrationPlate: string;
}

  
export interface BookingsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Booking[]; 
}

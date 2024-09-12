import { Service } from "./serviceTypes";

export interface Slot {
    _id: string;
    service: Service; 
    date: string; 
    startTime: string; 
    endTime: string; 
    isBooked: string; 
    createdAt: string; 
    updatedAt: string; 
  }
  

  export interface SlotsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Slot[]; 
  }
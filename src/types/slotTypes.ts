import { Service } from "./Servicetypes";

export interface Slot {
    _id: string;
    service: Service; // Reference to the service being booked
    date: string; // YYYY-MM-DD format
    startTime: string; // HH:MM format
    endTime: string; // HH:MM format
    isBooked: string; // Can be 'available' or 'booked'
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  }
  
  // Define the response type for multiple slots
  export interface SlotsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Slot[]; // List of available slots
  }
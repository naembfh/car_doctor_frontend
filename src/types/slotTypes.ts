// import { Service } from "./serviceTypes";

import { Service } from "./serviceTypes";

export interface Slot {
  _id: string;
  service: string | Service;     // Keep this as string if you are storing service IDs
  date: string;        // Date in string format (ISO format)
  startTime: string;   // Start time of the slot
  endTime: string;     // End time of the slot
  isBooked: string;    // Status of the booking
  createdAt: string;
  updatedAt: string;
}

  

export interface SlotsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Slot[];  // Array of slots in the response
}

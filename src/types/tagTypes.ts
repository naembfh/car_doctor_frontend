// Define your tag types
export type ServiceTags = { type: 'Service'; id?: number };
export type BookingTags = { type: 'Booking' };
export type SlotTags = { type: 'Slot'; serviceId?: number };

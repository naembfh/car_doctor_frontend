import { Slot, } from "../../types/slotTypes";
import { baseApi } from "./baseApi";

export const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch available slots by serviceId
    getAvailableSlots: builder.query<any, number>({  
      query: (serviceId) => `slots/availability?serviceId=${serviceId}`,
      transformResponse: (response: any) => {
        // Log the full API response
        console.log('Full API Response for Available Slots:', response);
        return response; 
      },
    }),
    // Create new slots
    addSlot: builder.mutation<any, Partial<Slot>>({  
      query: (slot) => ({
        url: "services/slots",
        method: "POST",
        body: slot,
      }),
      transformResponse: (response: any) => {
        // Log the full API response
        console.log('Full API Response for Created Slot:', response);
        return response;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAvailableSlotsQuery,
  useAddSlotMutation,
} = slotApi;

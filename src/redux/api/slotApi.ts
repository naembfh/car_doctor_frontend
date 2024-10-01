import { Slot } from "../../types/slotTypes";
import { SlotTags } from "../../types/tagTypes";
import { baseApi } from "./baseApi";

export const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch available slots, optionally by serviceId
    getAvailableSlots: builder.query<any, string | undefined>({
      query: (serviceId) => {
        console.log(serviceId);
        return serviceId
          ? `slots/availability?serviceId=${serviceId}`
          : 'slots/availability'; 
      },
      transformResponse: (response: any) => {
        console.log('Full API Response for Available Slots:', response);
        return response;
      },
      providesTags: (serviceId): SlotTags[] => [{ type: 'Slot', serviceId }],
    }),

    // Create new slots
    addSlot: builder.mutation<any, Partial<Slot>>({
      query: (slot) => ({
        url: "services/slots",
        method: "POST",
        body: slot,
      }),
      transformResponse: (response: any) => {
        console.log('Full API Response for Created Slot:', response);
        return response;
      },
      invalidatesTags: ['Slot'],
    }),

    // Update slot status mutation
    updateSlotStatus: builder.mutation<any, { slotId: string; status: string }>({
      query: ({ slotId, status }) => ({
        url: 'slots/update', 
        method: 'PATCH',
        body: { slotId, isBooked: status }, 
      }),
      transformResponse: (response: any) => {
        console.log('Full API Response for Updated Slot Status:', response);
        return response;
      },
      invalidatesTags: ['Slot'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAvailableSlotsQuery,
  useAddSlotMutation,
  useUpdateSlotStatusMutation,
} = slotApi;

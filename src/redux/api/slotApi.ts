import { Slot } from "../../types/slotTypes";
import { SlotTags } from "../../types/tagTypes";
import { baseApi } from "./baseApi";


export const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch available slots, optionally by serviceId
    getAvailableSlots: builder.query<any, number | void>({
      query: (serviceId) => {
        if (serviceId) {
          return `slots/availability?serviceId=${serviceId}`;
        } else {
          return 'slots/availability'; // Fetch all slots if no serviceId is provided
        }
      },
      transformResponse: (response: any) => {
        console.log('Full API Response for Available Slots:', response);
        return response;
      },
      providesTags: (result, error, serviceId): SlotTags[] => [{ type: 'Slot', serviceId }]
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
      invalidatesTags: ['Slot']
    }),

    // Update slot status
    updateSlotStatus: builder.mutation<any, { slotId: string; status: string }>({
      query: ({ slotId, status }) => ({
        url: `slots/${slotId}`,
        method: 'PATCH', // Use PATCH method for partial updates
        body: { status },
      }),
      transformResponse: (response: any) => {
        console.log('Full API Response for Updated Slot Status:', response);
        return response;
      },
      invalidatesTags: ['Slot'], // Invalidate Slot cache to trigger a re-fetch
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAvailableSlotsQuery,
  useAddSlotMutation,
  useUpdateSlotStatusMutation,
} = slotApi;

import { Slot, SlotsResponse } from "../../types/slotTypes";
import { baseApi } from "./baseApi";

export const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch available slots
    getAvailableSlots: builder.query<SlotsResponse, void>({
      query: () => "slots/availability",
    }),
    // Create new slots
    addSlot: builder.mutation<Slot, Partial<Slot>>({
      query: (slot) => ({
        url: "services/slots",
        method: "POST",
        body: slot,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAvailableSlotsQuery,
  useAddSlotMutation,
} = slotApi;

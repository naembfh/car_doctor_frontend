import { Service } from "../../types/serviceTypes";
import { baseApi } from "./baseApi";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all services
    getServices: builder.query<any, void>({
      query: () => "services",
      transformResponse: (response: any) => {
        console.log('Full Response for All Services:', response);
        return response;
      },
      providesTags: (result) => {
        console.log("Result in providesTags:", result);
        return result && Array.isArray(result)
          ? [
              ...result.map(({ id }: { id: number }) => ({ type: 'Service' as const, id })),
              { type: 'Service' as const },
            ]
          : [{ type: 'Service' as const }];
      },
    }),

    // Fetch a service by ID
    getServiceById: builder.query<any, string>({
      query: (id) => `services/${id}`,
      transformResponse: (response: any) => {
        console.log('Full Response for Service by ID:', response);
        return response;
      },
      providesTags: (_, __, id) => [{ type: 'Service' as const, id }],
    }),

    // Add a new service
    addService: builder.mutation<any, Partial<Service>>({
      query: (service) => ({
        url: "services",
        method: "POST",
        body: service,
      }),
      transformResponse: (response: any) => {
        console.log('Full Response for Service Added:', response);
        return response;
      },
      invalidatesTags: [{ type: 'Service' as const }],
    }),

    // Update an existing service
    updateService: builder.mutation<any, { id: string; service: Partial<Service> }>({
      query: ({ id, service }) => ({
        url: `services/${id}`,
        method: "PUT",
        body: service,
      }),
      transformResponse: (response: any) => {
        console.log('Full Response for Service Updated:', response);
        return response;
      },
      invalidatesTags: (_, __, { id }) => [{ type: 'Service' as const, id }, { type: 'Service' as const }],
    }),

    // Delete a service by ID
    deleteService: builder.mutation<any, string>({
      query: (id) => ({
        url: `services/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => {
        console.log('Full Response for Service Deleted:', response);
        return response;
      },
      invalidatesTags: (_, __, id) => [{ type: 'Service' as const, id }, { type: 'Service' as const }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;

import { Service } from "../../types/serviceTypes"; 
import { ServiceTags } from "../../types/tagTypes";
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
      providesTags: ['Service']
    }),
    
    // Fetch a service by ID
    getServiceById: builder.query<any, number>({ 
      query: (id) => `services/${id}`,
      transformResponse: (response: any) => {
        console.log('Full Response for Service by ID:', response);
        return response; 
      },
      providesTags: (result, error, id): ServiceTags[] => [{ type: 'Service', id }]
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
      invalidatesTags: ['Service']
    }),
    
    // Update an existing service
    updateService: builder.mutation<any, { id: number; service: Partial<Service> }>({
      query: ({ id, service }) => ({
        url: `services/${id}`,
        method: "PUT",
        body: service,
      }),
      transformResponse: (response: any) => {
        console.log('Full Response for Service Updated:', response);
        return response; 
      },
      invalidatesTags: (result, error, { id }): ServiceTags[] => [{ type: 'Service', id }]
    }),
    
    // Delete a service by ID
    deleteService: builder.mutation<any, number>({
      query: (id) => ({
        url: `services/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => {
        console.log('Full Response for Service Deleted:', response);
        return response; 
      },
      invalidatesTags: (result, error, id): ServiceTags[] => [{ type: 'Service', id }]
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

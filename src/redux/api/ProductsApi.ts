import { Service, ServicesResponse } from "../../types/Servicetypes"; 
import { baseApi } from "./baseApi";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<ServicesResponse, void>({
      query: () => "services",
    }),
    getServiceById: builder.query<{ service: Service }, number>({ 
      query: (id) => `services/${id}`,
    }),
    addService: builder.mutation<Service, Partial<Service>>({
      query: (service) => ({
        url: "services",
        method: "POST",
        body: service,
      }),
    }),
    updateService: builder.mutation<
      Service,
      { id: number; service: Partial<Service> } 
    >({
      query: ({ id, service }) => ({
        url: `services/${id}`,
        method: "PUT",
        body: service,
      }),
    }),
    deleteService: builder.mutation<void, number>({
      query: (id) => ({
        url: `services/${id}`,
        method: "DELETE",
      }),
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

import { TQueryParam } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const rentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getCustomerBooking: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: `/rentals`,
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['booking'],
        }),


        getAllBooking: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: `/rentals/allRent`,
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['booking']
        }),

        createRentBike: builder.mutation({
            query: (data) => {
                console.log("inside base api=>", data);
                return {
                    url: '/rentals',
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['booking', 'bikes']
        }),

        returnBike: builder.mutation({
            query: ({ id, data }) => {
                console.log("Updating product with id:", id, "and data:", data);
                return {
                    url: `/rentals/${id}/return`,
                    method: 'PUT',
                    body: data,
                }
            },
            invalidatesTags: ['booking', 'bikes']
        }),


        getRentReturnBike: builder.query({
            query: (id) => ({
                url: `/rentals/return/${id}`,
                method: 'GET',
            }),
            providesTags: (id) => [{ type: 'booking', id }]
        }),

    }),
});

export const {
    useGetAllBookingQuery,
    useGetCustomerBookingQuery,
    useCreateRentBikeMutation,
    useReturnBikeMutation,
    useGetRentReturnBikeQuery,
} = rentApi;

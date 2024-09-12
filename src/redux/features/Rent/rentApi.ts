import { TQueryParam } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const rentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllBooking: builder.query({
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
            invalidatesTags: ['booking']
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
            invalidatesTags: ['booking']
        }),

    }),
});

export const {
    useGetAllBookingQuery,
    useCreateRentBikeMutation,
    useReturnBikeMutation,
} = rentApi;
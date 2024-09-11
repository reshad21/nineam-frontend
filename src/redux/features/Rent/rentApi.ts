import { baseApi } from "../../api/baseApi";

const rentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // getAllProducts: builder.query({
        //     query: (args) => {
        //         const params = new URLSearchParams();

        //         if (args) {
        //             args.forEach((item: TQueryParam) => {
        //                 params.append(item.name, item.value as string);
        //             });
        //         }

        //         return {
        //             url: `/bikes`,
        //             method: 'GET',
        //             params: params
        //         }
        //     },
        //     providesTags: ['bikes']
        // }),

        getAllProducts: builder.query({
            query: (category) => ({
                url: `/bikes${category ? `?category=${category}` : ''}`,
                method: 'GET',
            }),
            providesTags: ['bikes'],
        }),

        getProductById: builder.query({
            query: (id) => ({
                url: `/bikes/${id}`,
                method: 'GET',
            }),
            providesTags: (id) => [{ type: 'bikes', id }]
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
            // invalidatesTags: ['bikes']
        }),

        // deleteProduct: builder.mutation({
        //     query: (id) => {
        //         console.log("inside base api=>", id);
        //         return {
        //             url: `/bikes/${id}`,
        //             method: 'DELETE',
        //         }
        //     },
        //     invalidatesTags: ['bikes']
        // }),

        // updateProduct: builder.mutation({
        //     query: ({ id, data }) => {
        //         console.log("Updating product with id:", id, "and data:", data);
        //         return {
        //             url: `/bikes/${id}`,
        //             method: 'PATCH',
        //             body: data,
        //         }
        //     },
        //     invalidatesTags: ['bikes']
        // }),

    }),
});

export const {
    useCreateRentBikeMutation,
    useGetProductByIdQuery
} = rentApi;
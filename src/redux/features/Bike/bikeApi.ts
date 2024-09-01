import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllProducts: builder.query({
            query: (category) => {
                const params = new URLSearchParams();
                if (category) {
                    params.append('category', category);
                }
                return {
                    url: `/bikes`,
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['bikes']
        }),

        // getAllProducts: builder.query({
        //     query: (category) => ({
        //         url: `/bikes${category ? `?category=${category}` : ''}`,
        //         method: 'GET',
        //     }),
        //     providesTags: ['bikes'],
        // }),

        getProductById: builder.query({
            query: (id) => ({
                url: `/bikes/${id}`,
                method: 'GET',
            }),
            providesTags: (id) => [{ type: 'bikes', id }]
        }),

        getAllFilterProducts: builder.query({
            query: ({ category, brand, rating, price, searchTerm, sort }) => {  // Added sort parameter
                console.log("RTK QUERY =>", category, brand, rating, price, searchTerm, sort);
                const params = new URLSearchParams();

                if (category) params.append('category', category);
                if (brand) params.append('brand', brand);
                if (rating !== null && rating !== undefined) params.append('rating', rating.toString());
                if (price !== null && price !== undefined) params.append('price', price.toString());
                if (searchTerm) params.append('searchTerm', searchTerm);
                if (sort) params.append('sort', sort);  // Append the sort parameter

                const queryString = params.toString();
                const url = queryString ? `/products?${queryString}` : '/products';

                return {
                    url: url,
                    method: 'GET'
                };
            }
        }),

        addProducts: builder.mutation({
            query: (data) => {
                console.log("inside base api=>", data);
                return {
                    url: '/bikes',
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['bikes']
        }),

        deleteProduct: builder.mutation({
            query: (id) => {
                console.log("Deleting todo with id:", id);
                return {
                    url: `/bikes/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['bikes']
        }),

        updateProduct: builder.mutation({
            query: ({ id, data }) => {
                console.log("Updating product with id:", id, "and data:", data);
                return {
                    url: `/bikes/${id}`,
                    method: 'PATCH',
                    body: data,
                }
            },
            invalidatesTags: ['bikes']
        }),

    }),
});

export const {
    useAddProductsMutation,
    useGetAllProductsQuery,
    useGetAllFilterProductsQuery,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useGetProductByIdQuery
} = productApi;
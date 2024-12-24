import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addReviews: builder.mutation({
            query: (data) => {
                console.log("inside base api=>", data);
                return {
                    url: '/reviews',
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['bikes']
        }),

        deleteReview: builder.mutation({
            query: (id) => {
                console.log("inside base api=>", id);
                return {
                    url: `/reviews/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['bikes']
        }),

        updateReview: builder.mutation({
            query: ({ id, data }) => {
                console.log("Updating product with id:", id, "and data:", data);
                return {
                    url: `/reviews/${id}`,
                    method: 'PATCH',
                    body: data,
                }
            },
            invalidatesTags: ['bikes']
        }),

    }),
});

export const {
    useAddReviewsMutation,
    useDeleteReviewMutation,
    useUpdateReviewMutation,
} = reviewApi;
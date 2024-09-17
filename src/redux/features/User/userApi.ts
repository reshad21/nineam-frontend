import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllUsers: builder.query({
            query: () => ({
                url: `/users/all-users`,
                method: 'GET',
            }),
            providesTags: ['user']
        }),

        deleteUser: builder.mutation({
            query: (id) => {
                console.log("inside base api=>", id);
                return {
                    url: `/users/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['user']
        }),

        updateUserRole: builder.mutation({
            query: ({ id, data }) => {
                console.log("Updating product with id:", id, "and data:", data);
                return {
                    url: `/users/role/${id}`,
                    method: 'PATCH',
                    body: data,
                }
            },
            invalidatesTags: ['user']
        }),

        updateUserProfile: builder.mutation({
            query: ({ id, data }) => {
                console.log("Updating user profile with id:", id, "and data:", data);
                return {
                    url: `/users/me/${id}`,
                    method: 'PATCH',
                    body: data,
                }
            },
            invalidatesTags: ['user']
        }),

        getSingleUser: builder.query({
            query: (id) => {
                console.log("get user api hit here==>", id);
                return {
                    url: `/users/single-user/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['user'],
        }),

    })
});

export const {
    useGetAllUsersQuery,
    useDeleteUserMutation,
    useUpdateUserRoleMutation,
    useUpdateUserProfileMutation,
    useGetSingleUserQuery
} = userApi;
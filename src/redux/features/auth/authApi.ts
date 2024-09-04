import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                body: userInfo,
            }),
        }),
        registration: builder.mutation({
            query: (userInfo) => {
                console.log("inside base api=>", userInfo);
                return {
                    url: '/auth/signup',
                    method: 'POST',
                    body: userInfo,
                }
            },
        }),

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


    })
});

export const { useLoginMutation, useRegistrationMutation, useGetAllUsersQuery, useDeleteUserMutation, useUpdateUserRoleMutation } = authApi;
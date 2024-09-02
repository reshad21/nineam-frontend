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
            // providesTags: (id) => [{ type: 'bikes', id }]
        }),

    })
});

export const { useLoginMutation, useRegistrationMutation, useGetAllUsersQuery } = authApi;
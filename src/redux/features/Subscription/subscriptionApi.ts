import { TQueryParam } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllSubscriber: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: `/subscriptions`,
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['subscriptions']
        }),


        createSubscriber: builder.mutation({
            query: (data) => {
                console.log("inside base api=>", data);
                return {
                    url: '/subscriptions',
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['subscriptions']
        }),

    }),
});

export const {
    useGetAllSubscriberQuery,
    useCreateSubscriberMutation,
} = subscriptionApi;
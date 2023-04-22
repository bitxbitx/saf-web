import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
// import { authMiddleware } from '../../middleware/auth.middleware';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/orders', credentials: 'include' }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => '/',
            providesTags: ['Order'],
        }),
        getOrder: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['Order'],
        }),
        updateOrder: builder.mutation({
            query: (body) => ({
                url: `/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Order'],
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
        }),
        createOrder: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            }),
        }),
    }),
});

// orderApi.middleware.push(authMiddleware);


export const { useGetOrdersQuery, useGetOrderQuery, useUpdateOrderMutation, useDeleteOrderMutation, useCreateOrderMutation } = orderApi;
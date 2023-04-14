import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const shopLocationApi = createApi({
    reducerPath: 'shopLocationApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/shopLocations', credentials: 'include' }),
    tagTypes: ['ShopLocation'],
    endpoints: (builder) => ({
        getShopLocations: builder.query({
            query: () => '/',
            providesTags: ['ShopLocation'],
        }),
        getShopLocation: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['ShopLocation'],
        }),
        updateShopLocation: builder.mutation({
            query: (body) => ({
                url: `/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['ShopLocation'],
        }),
        deleteShopLocation: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ShopLocation'],
        }),
        createShopLocation: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetShopLocationsQuery, useGetShopLocationQuery, useUpdateShopLocationMutation, useDeleteShopLocationMutation, useCreateShopLocationMutation } = shopLocationApi;
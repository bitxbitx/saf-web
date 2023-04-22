import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { authMiddleware } from '../../middleware/api.middleware';

export const shopLocationApi = createApi({
    reducerPath: 'shopLocationApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/shop-location', credentials: 'include' }),
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
            invalidatesTags: ['ShopLocation'],
        }),
    }),
});

// shopLocationApi.middleware.push(authMiddleware);

export const { useGetShopLocationsQuery, useGetShopLocationQuery, useUpdateShopLocationMutation, useDeleteShopLocationMutation, useCreateShopLocationMutation } = shopLocationApi;
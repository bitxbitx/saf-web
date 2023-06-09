import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { authMiddleware } from '../../middleware/api.middleware';
require('dotenv').config();

export const wishlistApi = createApi({
    reducerPath: 'wishlistApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BACKEND_URL + '/api/wishlists', credentials: 'include' }),
    tagTypes: ['Wishlist'],
    endpoints: (builder) => ({
        getWishlists: builder.query({
            query: () => '/',
            providesTags: ['Wishlist'],
        }),
        getWishlist: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['Wishlist'],
        }),
        updateWishlist: builder.mutation({
            query: (body) => ({
                url: `/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Wishlist'],
        }),
        deleteWishlist: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Wishlist'],
        }),
        createWishlist: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            }),
        }),
    }),
});

// wishlistApi.middleware.push(authMiddleware);

export const { useGetWishlistsQuery, useGetWishlistQuery, useUpdateWishlistMutation, useDeleteWishlistMutation, useCreateWishlistMutation } = wishlistApi;
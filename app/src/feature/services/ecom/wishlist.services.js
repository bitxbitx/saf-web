import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const wishlistApi = createApi({
    reducerPath: 'wishlistApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/wishlists', credentials: 'include' }),
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

export const { useGetWishlistsQuery, useGetWishlistQuery, useUpdateWishlistMutation, useDeleteWishlistMutation, useCreateWishlistMutation } = wishlistApi;
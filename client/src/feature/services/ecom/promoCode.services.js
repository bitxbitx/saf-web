import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { authMiddleware } from '../../middleware/api.middleware';
require('dotenv').config();

export const promoCodeApi = createApi({
    reducerPath: 'promoCodeApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BACKEND_URL + '/api/promo-codes', credentials: 'include' }),
    tagTypes: ['PromoCode'],
    endpoints: (builder) => ({
        getPromoCodes: builder.query({
            query: () => '/',
            providesTags: ['PromoCode'],
        }),
        getPromoCode: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['PromoCode'],
        }),
        updatePromoCode: builder.mutation({
            query: (body) => ({
                url: `/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['PromoCode'],
        }),
        deletePromoCode: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['PromoCode'],
        }),
        createPromoCode: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['PromoCode'],
        }),
    }),
});

// promoCodeApi.middleware.push(authMiddleware);

export const { useGetPromoCodesQuery, useGetPromoCodeQuery, useUpdatePromoCodeMutation, useDeletePromoCodeMutation, useCreatePromoCodeMutation } = promoCodeApi;
import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/products', credentials: 'include' }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/',
            providesTags: ['Product'],
        }),
        getProduct: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (body) => ({
                url: `/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        createProduct: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetProductsQuery, useGetProductQuery, useUpdateProductMutation, useDeleteProductMutation, useCreateProductMutation } = productApi;
import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const productCategoryApi = createApi({
    reducerPath: 'productCategoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/productCategories', credentials: 'include' }),
    tagTypes: ['ProductCategory'],
    endpoints: (builder) => ({
        getProductCategories: builder.query({
            query: () => '/',
            providesTags: ['ProductCategory'],
        }),
        getProductCategory: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['ProductCategory'],
        }),
        updateProductCategory: builder.mutation({
            query: (body) => ({
                url: `/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['ProductCategory'],
        }),
        deleteProductCategory: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ProductCategory'],
        }),
        createProductCategory: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetProductCategoriesQuery, useGetProductCategoryQuery, useUpdateProductCategoryMutation, useDeleteProductCategoryMutation, useCreateProductCategoryMutation } = productCategoryApi;
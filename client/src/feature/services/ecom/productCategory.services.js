import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { authMiddleware } from '../../middleware/api.middleware';
require('dotenv').config();

export const productCategoryApi = createApi({
    reducerPath: 'productCategoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BACKEND_URL + '/api/product-categories', credentials: 'include' }),
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
            query: (body) => {
              const formData = new FormData();
              formData.append('name', body.name);
              formData.append('description', body.description);
              formData.append('image', body.image);
          
              return {
                url: `/${body.id}`,
                method: 'PUT',
                body: formData,
              };
            },
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
            invalidatesTags: ['ProductCategory'],
        }),
    }),

});

// productCategoryApi.middleware.push(authMiddleware);

export const { useGetProductCategoriesQuery, useGetProductCategoryQuery, useUpdateProductCategoryMutation, useDeleteProductCategoryMutation, useCreateProductCategoryMutation } = productCategoryApi;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { authMiddleware } from '../../middleware/api.middleware';
import customFetchBaseQuery from '../../customFetchBaseQuery';
require('dotenv').config();

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BACKEND_URL + '/api/products', credentials: 'include' }),
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
            query: (body) => {
                const formData = new FormData();
                formData.append('name', body.name);
                formData.append('description', body.description);
                formData.append('image', body.image);
                // formData.append('productDetail', body.productDetail);
                formData.append('sku', body.sku);
                formData.append('price', body.price);
                formData.append('stock', body.stock);
                formData.append('status', body.status);

                // storre array of json - productCategory - in formData
                formData.append('productCategory', JSON.stringify(body.productCategory));
                return {
                    url: `/${body.id}`,
                    method: 'PUT',
                    body: formData,
                };
            },
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
            query: (body) => {
                const formData = new FormData();
                formData.append('name', body.name);
                formData.append('description', body.description);
                formData.append('image', body.image);
                // formData.append('productDetail', body.productDetail);
                formData.append('sku', body.sku);
                formData.append('price', body.price);
                formData.append('stock', body.stock);
                formData.append('status', body.status);
                
                // storre array of json - productCategory - in formData
                formData.append('productCategory', JSON.stringify(body.productCategory));
                return {
                    url: '/',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['Product'],
        }),
    }),
});

// productApi.middleware.push(authMiddleware);

export const { useGetProductsQuery, useGetProductQuery, useUpdateProductMutation, useDeleteProductMutation, useCreateProductMutation } = productApi;
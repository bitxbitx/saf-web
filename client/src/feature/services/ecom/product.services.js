import { createApi } from '@reduxjs/toolkit/query/react';
// import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { authMiddleware } from '../../middleware/api.middleware';
import customFetchBaseQuery from '../../customFetchBaseQuery';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: customFetchBaseQuery({ baseUrl: 'http://localhost:8000/api/products', credentials: 'include' }),
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
                formData.append('productDetail', body.productDetail);
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
                formData.append('productDetail', body.productDetail);
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
import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { authMiddleware } from '../../middleware/api.middleware';

export const productVariantApi = createApi({
    reducerPath: 'productVariantApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/product-variants', credentials: 'include' }),
    tagTypes: ['ProductVariant'],
    endpoints: (builder) => ({
        getProductVariants: builder.query({
            query: () => '/',
            providesTags: ['ProductVariant'],
        }),
        getProductVariant: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['ProductVariant'],
        }),
        updateProductVariant: builder.mutation({
            query: (body) => {
                const formData = new FormData();
                formData.append('product', body.product);
                formData.append('price', body.price);
                formData.append('inventoryStock', body.inventoryStock);
                formData.append('image', body.image);
                formData.append('sku', body.sku);

                // Change json to string for attributes
                formData.append('attributes', JSON.stringify(body.attributes));
                return {
                    url: `/${body}`,
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: ['ProductVariant'],
        }),
        deleteProductVariant: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ProductVariant'],
        }),
        createProductVariant: builder.mutation({
            query: (body) => {
                const formData = new FormData();
                formData.append('product', body.product);
                formData.append('price', body.price);
                formData.append('inventoryStock', body.inventoryStock);
                formData.append('image', body.image);
                formData.append('sku', body.sku);

                // Change json to string for attributes
                formData.append('attributes', JSON.stringify(body.attributes));
                // Log out all data in formData

                return {
                    url: '/',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['ProductVariant'],
        }),
        getProductVariantByProduct: builder.query({
            query: (id) => `?product=${id}`,
            providesTags: ['ProductVariant'],
        }),
    }),
});

// productVariantApi.middleware.use(authMiddleware);

export const { useGetProductVariantsQuery, useGetProductVariantQuery, useUpdateProductVariantMutation, useDeleteProductVariantMutation, useCreateProductVariantMutation, useGetProductVariantByProductQuery } = productVariantApi;
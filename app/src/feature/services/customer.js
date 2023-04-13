import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const customerApi = createApi({
    reducerPath: 'customerApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/api/customers'}),
    tagTypes: ['Customer'],
    endpoints: (builder) => ({
        getCustomer: builder.query({
            query: () => '/',
            providesTags: ['Customer'],
        }),
        getCustomerById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{type: 'Customer', id}],
        }),
        createCustomer: builder.mutation({
            query: (newCustomer) => ({
                url: '/',
                method: 'POST',
                body: newCustomer,
            }),
            invalidatesTags: ['Customer'],
        }),
        updateCustomer: builder.mutation({
            query: (updatedCustomer) => ({
                url: `/${updatedCustomer.id}`,
                method: 'PUT',
                body: updatedCustomer,
            }),
            invalidatesTags: (result, error, id) => [{type: 'Customer', id}],
        }),
        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{type: 'Customer', id}],
        }),
    }),
});

export const { useGetCustomerQuery, useGetCustomerByIdQuery, useCreateCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation } = customerApi;
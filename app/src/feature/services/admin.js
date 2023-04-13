import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/api/admins', credentials: 'include'}),
    tagTypes: ['Admin'],
    endpoints: (builder) => ({
        getAdmin: builder.query({
            query: () => '/',
            providesTags: ['Admin'],
        }),
        getAdminById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{type: 'Admin', id}],
        }),
        createAdmin: builder.mutation({
            query: (newAdmin) => ({
                url: '/',
                method: 'POST',
                body: newAdmin,
            }),
            invalidatesTags: ['Admin'],
        }),
        updateAdmin: builder.mutation({
            query: (updatedAdmin) => ({
                url: `/${updatedAdmin.id}`,
                method: 'PUT',
                body: updatedAdmin,
            }),
            invalidatesTags: (result, error, id) => [{type: 'Admin', id}],
        }),
        deleteAdmin: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{type: 'Admin', id}],
        }),
    }),
});

export const { useGetAdminQuery, useGetAdminByIdQuery, useCreateAdminMutation, useUpdateAdminMutation, useDeleteAdminMutation } = adminApi;
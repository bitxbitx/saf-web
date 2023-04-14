import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/users', credentials: 'include' }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/',
            providesTags: ['User'],
        }),
        getUser: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: (body) => ({
                url: `/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        createUser: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation, useCreateUserMutation } = userApi;
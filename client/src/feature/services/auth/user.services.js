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
            query: (body) => {
                const formData = new FormData();
                formData.append('name', body.name);
                formData.append('email', body.email);
                formData.append('password', body.password);
                formData.append('role', body.role);
                formData.append('username', body.username);
                formData.append('phoneNumber', body.phoneNumber);
                formData.append('dob', body.dob);
                formData.append('ethnicity', body.ethnicity);
                formData.append('image', body.image);

                return {
                    url: `/${body.id}`,
                    method: 'PUT',
                    body: formData,
                };
            },
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
            query: (body) => {
                const formData = new FormData();
                formData.append('name', body.name);
                formData.append('email', body.email);
                formData.append('password', body.password);
                formData.append('role', body.role);
                formData.append('username', body.username);
                formData.append('phoneNumber', body.phoneNumber);
                formData.append('dob', body.dob);
                formData.append('ethnicity', body.ethnicity);
                formData.append('image', body.image);

                return {
                    url: '/',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation, useCreateUserMutation } = userApi;
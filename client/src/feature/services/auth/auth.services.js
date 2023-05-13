import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
require('dotenv').config();

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BACKEND_URL + '/api/auth', credentials: 'include' }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET',
            }),
            invalidatesTags: ['Auth'],
        }),
        register: builder.mutation({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),
        me: builder.query({
            query: () => '/me',
            providesTags: ['Auth'],
        }),
        forgotPassword: builder.mutation({
            query: (body) => ({
                url: '/forgot-password',
                method: 'POST',
                body,
            }),
        }),
        resetPassword: builder.mutation({
            query: (body) => ({
                url: `/reset-password/${body.resetToken}`,
                method: 'POST',
                body,
            }),
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: '/refresh-token',
                method: 'POST',
            }),
        }),
        updateDetails: builder.mutation({
            query: (body) => ({
                url: '/update-details',
                method: 'PUT',
                body,
            }),
        }),
    }),
});


export const { 
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation, 
    useMeQuery,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useRefreshTokenMutation,
    useUpdateDetailsMutation,
} = authApi;

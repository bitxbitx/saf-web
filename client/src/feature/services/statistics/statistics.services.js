import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
require('dotenv').config();

export const statisticsApi = createApi({
    reducerPath: 'statisticsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BACKEND_URL + '/api/statistics', credentials: 'include' }),
    tagTypes: ['Statistics'],
    endpoints: (builder) => ({
        analyticsOverview: builder.query({
            query: (timeFrame) => '/analytics-overview?timeFrame=' + timeFrame,
            providesTags: ['Statistics'],
        }),
        productInsights: builder.query({
            query: (timeFrame) => '/product-insights?timeFrame=' + timeFrame + '&limit=5',
            providesTags: ['Statistics'],
        }),
        customerInsights: builder.query({
            query: (timeFrame) => '/customer-insights?timeFrame=' + timeFrame + '&limit=5',
            providesTags: ['Statistics'],
        }),
    }),
});

export const { useAnalyticsOverviewQuery, useProductInsightsQuery, useCustomerInsightsQuery } = statisticsApi;

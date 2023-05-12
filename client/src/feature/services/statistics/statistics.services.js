import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const statisticsApi = createApi({
    reducerPath: 'statisticsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/statistics', credentials: 'include' }),
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

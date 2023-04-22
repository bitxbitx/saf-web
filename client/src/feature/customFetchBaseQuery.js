import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const customFetchBaseQuery = ({ baseUrl, ...defaultOptions }) => async (
  path,
  options
) => {
  const response = await fetchBaseQuery(baseUrl + path, options);
  if (response.error?.status === 401) {
    const refreshResponse = await fetchBaseQuery('/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });
    if (refreshResponse.error?.status === 401) {
      // If refresh fails, redirect to login
      window.location.href = '/login';
      return Promise.reject('Not authenticated');
    } else {
      // If refresh succeeds, retry the original request
      const retryOptions = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${refreshResponse.data.access_token}`,
        },
      };
      return fetchBaseQuery(baseUrl + path, retryOptions);
    }
  } else if (!response.ok) {
    return Promise.reject(response.error?.data || 'Something went wrong');
  } else {
    return response;
  }
};


export default customFetchBaseQuery;
import { authApi } from '../services/auth/auth.services';

const handle401Error = async (result, api, endpointName) => {
  if (result.error.status === 401) {
    try {
      await authApi.endpoints.refreshToken.mutation();
      const originalResult = await api.endpoints[endpointName].initiated(result.arg, {
        signal: result.aborted,
        dispatch: result.request.dispatch,
        getState: result.request.getState,
      });
      return originalResult;
    } catch (error) {
      // Refresh token failed, redirect to login page
      window.location.href = '/login';
    }
  }

  return result;
};

const apiMiddleware = (api) => ({ dispatch, getState }) => (next) => async (action) => {
  const result = await next(action);

  if (api.endpoints[action.type]) {
    const endpointName = api.endpoints[action.type].name;
    return handle401Error(result, api, endpointName);
  }

  return result;
};

export default apiMiddleware;

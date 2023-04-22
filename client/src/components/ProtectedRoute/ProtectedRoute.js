import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useMeQuery } from '../../feature/services/auth/auth.services';
import { useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {
  const location = useLocation();
  const { data, isLoading, isError } = useMeQuery();

  if (isError && isError.response?.status === 401) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
    );
  }

  const isLoggedIn = !!data?.user;
  
  if (isLoading) {
    // TODO: implement a loading screen
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;

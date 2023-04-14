import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useMeQuery } from '../feature/services/auth/auth.services';

const ProtectedRoute =  ({ children,  ...rest }) => {
    const {  data , isLoading } = useMeQuery();
    const isLoggedIn = data.user ? true : false;

    // TODO : implement a loading screen
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLoading ? ( <div>Loading...</div> ) :
                isLoggedIn ? ( children ) : ( <Redirect to={{ pathname: "/landing", state: { from: location } }} />
                )
            }
        />
    );


    
};

export default ProtectedRoute;
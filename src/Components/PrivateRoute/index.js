import React from "react";

import { Route, Redirect } from 'react-router-dom';
import checkAuth from "../../Lib/Authentication";

export default ({ component: Component, componentCallback, ...rest }) => (
    <Route {...rest}
        render={props =>
            checkAuth() ? (
                <Component {...props} componentCallback={componentCallback} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);
import React from "react";
import { Route, Redirect } from "react-router-dom";

export const Guestroutes = ({
  component: Component,
  isAuth: isAuth,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        //Run if Auth is false
        if (!isAuth) {
          return <Component />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

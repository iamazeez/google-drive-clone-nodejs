import React from "react";
import { Route, Redirect } from "react-router-dom";

export const Protectedroute = ({
  component: Component,
  isAuth: isAuth,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth || localStorage.getItem("token")) {
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

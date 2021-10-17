import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const PrivateRoute = (props) => {
  let token = localStorage.getItem("AUTH_TOKEN");
  const isLoggedIn = token ? true : false;

  return (
    <Route {...props}>
      {isLoggedIn ? (
        props.children
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )}
    </Route>
  );
};

export default withRouter(PrivateRoute);

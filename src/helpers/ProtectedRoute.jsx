import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
//import auth from "./auth";
import { AuthContext } from "../helpers/AuthContext";


export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        const { authState } = useContext(AuthContext);
        console.log("authState.status", authState.status);
        //if (auth.isAuthenticated()) {
        if (authState.status){
           return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

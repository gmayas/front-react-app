const PrivateRoute = (props) => {
    const location = useLocation();
    const { authState } = useContext(AuthContext);
    console.log("authState.status", authState.status);
  
    return authState.status ? (
      <Route {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location }
        }}
      />
    );
  };
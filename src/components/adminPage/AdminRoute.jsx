import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminRoute = ({ component: Component, ...rest }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  if (userRole === null) {
    // Optionally, you can return a loading spinner or message here
    return null; // Or return a loading spinner or message
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        userRole === "admin" ? (
          React.isValidElement(Component) ? (
            React.cloneElement(Component, props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to="/unauthorized" />
        )
      }
    />
  );
};

export default AdminRoute;

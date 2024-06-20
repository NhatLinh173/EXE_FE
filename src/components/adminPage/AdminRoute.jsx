import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const AdminRoute = ({ component: Comment, ...rest }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodeToken = jwtDecode(token);
      setUserRole(decodeToken.role);
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        userRole === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/unauthorized" />
        )
      }
    />
  );
};

export default AdminRoute;

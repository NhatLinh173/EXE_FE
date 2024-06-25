import React, { useState, useEffect } from "react";
import Loading from "./loading";

const withLoading = (Component) => {
  return (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }, []);

    return loading ? <Loading /> : <Component {...props} />;
  };
};

export default withLoading;

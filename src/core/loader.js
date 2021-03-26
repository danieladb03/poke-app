import React from "react";
import Skeleton from "react-loading-skeleton";

const Loader = ({isLoading, children, ...props}) => {
  return isLoading ? <Skeleton {...props} /> : children;
};

export default Loader;

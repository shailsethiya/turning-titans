import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";

import ErrorBoundary from "../ErrorBoundary";

import { getRoutes } from "./config";

/** ***************** 
@Purpose : render App
@Parameter : {}
@Author : shailendra
******************/
function BaseRoutes(props) {
  /** ***************** 
  @purpose : used for return routes
  @Author : shailendra
  ******************/
  const allRoutes = useRoutes(getRoutes());
  return (
    <Suspense fallback="loading">
      <ErrorBoundary>{allRoutes}</ErrorBoundary>
    </Suspense>
  );
}

export default BaseRoutes;

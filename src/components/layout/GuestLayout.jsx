import React from "react";
import { Outlet } from "react-router-dom";

function GuestLayout() {
  /** ***************** 
@Purpose : Used for render HTML/Components
@Parameter : {}
@Author : shailendra
******************/
  return (
    <div className="container-scroller">
      <div className="main-wrapper">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default GuestLayout;

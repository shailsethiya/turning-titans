import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { paths } from "../routes/Path";
import { getToken } from "../store/selectors/auth";


/** *************************
@Purpose : Used to declare public route
@Parameter : {}
@Author : shailendra
********************/
function PrivateRoute({children}) {
  // const token11 = useSelector(getToken);
  // console.log("toke" , token11);
  const token = "123"
  // console.log("token" , token);
   if(token){
         <Outlet />
   }
   return children ;
  // return token ?  : <Navigate to={paths.LOGIN} />;
}

export default PrivateRoute;

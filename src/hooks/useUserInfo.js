// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

import { paths } from "../routes/Path";
import { userInfo } from "../store/selectors";
import { COOKIES, ROLES } from "../utils/constants";
import { getCookie } from "../utils/functions";

export const useUserInfo = () => {
  let role = null;
  const userData = useSelector(userInfo);
  const token = getCookie(COOKIES.TOKEN);

  const getRedirectPath = (role) => {
    if (role === ROLES.ADMIN) {
      return paths.DASHBOARD;
    } else if (role === ROLES.SEAFARER) {
      return paths.SEAFARERS_PROFILE;
    } else if (role === ROLES.OPERATOR) {
      return paths.OPERATOR_DASHBOARD;
    } else if (role === ROLES.AGENT) {
      return paths.AGENT_DASHBOARD;
    }
  };

  const getSidebarVisibility = (role) => {
    if (
      role === ROLES.ADMIN ||
      role === ROLES.AGENT ||
      role === ROLES.OPERATOR
    ) {
      return true;
    }
    return false;
  };

  if (token) {
    const decodeJwt = jwt_decode(token);
    role = decodeJwt?.roles?.[0];
  }

  return {
    userData,
    role,
    token,
    getRedirectPath,
    getSidebarVisibility,
  };
};

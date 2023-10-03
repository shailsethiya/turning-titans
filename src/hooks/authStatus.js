import {
  getRefreshUserProfileDetails,
  setProfileDetails,
  tokenExpire,
} from "../store/actions";
import { COOKIES, STATUS } from "../utils/constants";
import { getCookie } from "../utils/functions";

const listenLoggedInUser = async (handler) => {
  // setTimeout(async () => {
  const token = getCookie(COOKIES.TOKEN);
  if (!token || token === "undefined" || token === null) {
    handler(null);
    return;
  }
  const userInfo = await getRefreshUserProfileDetails();
  handler(userInfo);
  // }, [1000]);
};

export const useListenForUserLoggedIn = (dispatch) => {
  listenLoggedInUser((user) => {
    if (user === STATUS.UNAUTHORIZED) {
      dispatch(tokenExpire(dispatch));
    } else {
      dispatch(setProfileDetails(user));
    }
  });
};

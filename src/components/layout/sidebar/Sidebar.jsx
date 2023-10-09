import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Typography, Chip } from "@material-ui/core";
import { useLocation, matchPath, useNavigate } from "react-router-dom";
import withRouter from "../../../hooks/withRouter";
import SvgIcon from "@material-ui/core/SvgIcon";
import { ReactComponent as Home } from "../../../assets/images/sidebar/smart-home.svg";
import { ReactComponent as List } from "../../../assets/images/sidebar/list.svg";
import { ReactComponent as FeatureStore } from "../../../assets/images/sidebar/feature-store.svg";
import { ReactComponent as Logout } from "../../../assets/images/sidebar/logout.svg";
import { extract_query_param } from "../../../containers/utils/utils";
import "./Sidebar.scss";
import AlertDialog from "../../dialog";
import variables from "../../../containers/shared/variables.module.scss";
import { paths } from "../../../routes/Path";
import { logout } from "../../../store/actions";
import { useDispatch } from "react-redux";

const Sidebar = ({ history }) => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState();
  const [openDialog, setOpenDialog] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tabs = useMemo(
    () => [
      {
        label: "Proposal",
        link: paths.PROPOSAL,
        iconName: "smart-home.svg",
      },
      {
        label: "Offering",
        link: paths.OFFERING,
        iconName: "feature-store.svg",
      },
    ],
    []
  );

  const options = useMemo(
    () => [
      {
        label: "Logout",
        iconName: "logout.svg",
      },
    ],
    []
  );

  const images = {
    "smart-home.svg": { icon: Home, viewBox: "0 0 22 24" },
    "proposal.svg": { icon: List, viewBox: "0 0 20 15" },
    "feature-store.svg": { icon: FeatureStore, viewBox: "6 0 12 24" },
    "logout.svg": { icon: Logout, viewBox: "0 0 24 24" },
  };

  const logout_content = {
    title: "Logout",
    content: `Are you sure you want to sign out? Your current session will be ended, 
      and you'll need to sign in again next time. Please save any unsaved changes before signing out.`,
    secondContent: "Thank you!",
    noBtnTxt: "No, I will stay",
    yesBtnTxt: `Yes, logout`,
  };

  const getTab = useCallback(
    (obj) => {
      /* Extract tab from location  */
      const locationCollection = location.pathname.split("/");

      return obj.find((tab) => {
        if (tab.activeMatcher) {
          const location = window.location;
          const path = tab.activeMatcher;

          return matchPath(location.pathname, { path });
        } else {
          return tab.label.toLowerCase() === locationCollection[1];
        }
      });
    },
    [location.pathname]
  );

  const handleLogout = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const logoutUser = async () => {
     const res = await dispatch(logout());
     console.log("logout " ,res)
  };

  useEffect(() => {
    const matchedtab = getTab(tabs);
    setSelectedTab({ ...matchedtab });
  }, [tabs, location.pathname, getTab]);

  const handleSelectedTab = (tab) => {
    if (tab.route) {
      window.location = window.location.origin + url.split("//").join("/");
    } else {
      navigate(tab.link);
      // history.push({
      //   pathname: tab.link,
      // });
    }
  };

  return (
    <Box className="sidebar-container">
      <Box className="logo-icon"></Box>
      <Box className="tabs">
        {tabs.map((tab) => (
          <Box
            className="tab"
            key={tab.label}
            onClick={() => handleSelectedTab(tab)}
          >
            <Box
              className={`tab-padding ${
                selectedTab?.label === tab.label && "active-tab"
              }`}
            >
              <SvgIcon
                key={tab.label}
                color="primary"
                component={images[tab.iconName].icon}
                viewBox={images[tab.iconName].viewBox}
                style={{
                  width: "1vw",
                  height: "clamp(0.8vw, 1vw ,1.2vw)",
                  stroke: variables.white,
                  strokeWidth: "1.5",
                  fill: "none",
                }}
              />
              {<Typography className="overflow">{tab.label}</Typography>}
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        className="tabs lower-tabs"
        style={{ marginTop: "auto", paddingBottom: "4vw" }}
      >
        {options.map((option, index) => (
          <Box
            className="tab"
            key={option.label}
            onClick={() => handleSelectedTab(option)}
          >
            <Box
              style={{
                padding: selectedTab?.label === option.label && "0.6vw",
                position: "relative",
              }}
              className={`tab-padding ${
                selectedTab?.label === option.label && "active-tab"
              }`}
            >
              <>
                <SvgIcon
                  key={option.label}
                  color="primary"
                  component={images[option.iconName].icon}
                  viewBox={images[option.iconName].viewBox}
                  style={{
                    width: "1vw",
                    height: "clamp(0.8vw, 1vw ,1.2vw)",
                    stroke: variables.white,
                    strokeWidth: "1.5",
                    fill: "none",
                  }}
                />
              </>
              {
                <Typography onClick={handleLogout} className="overflow">
                  {option.label}
                </Typography>
              }
            </Box>
          </Box>
        ))}
      </Box>
      <AlertDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        dialogTitle={logout_content.title}
        dialogContent={logout_content.content}
        secondContent={logout_content.secondContent}
        noBtn={logout_content.noBtnTxt}
        yesBtn={logout_content.yesBtnTxt}
        handleConfirm={logoutUser}
      />
    </Box>
  );
};

export default withRouter(Sidebar);

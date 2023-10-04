import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, Chip } from '@material-ui/core';
import { useLocation, matchPath, useNavigate } from 'react-router-dom';
import withRouter from '../../../hooks/withRouter';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as Apps } from '../../../assets/images/sidebar/apps.svg';
import { ReactComponent as Jobs } from '../../../assets/images/sidebar/jobs.svg';
import { ReactComponent as Home } from '../../../assets/images/sidebar/smart-home.svg';
import { ReactComponent as ModelStore } from '../../../assets/images/sidebar/atom.svg';
import { ReactComponent as FeatureStore } from '../../../assets/images/sidebar/feature-store.svg';
import { extract_query_param } from '../../../containers/utils/utils';
import './Sidebar.scss';
import variables from '../../../containers/shared/variables.module.scss';
import { paths } from '../../../routes/Path';

const Sidebar = ({ history }) => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState();
  const navigate = useNavigate();

  const tabs = useMemo(
    () =>
      [
        {
          label: 'Proposal',
          link: paths.PROPOSAL,
          iconName: 'smart-home.svg',
        },
        {
          label: 'Listing',
          link: paths.LISTING,
          iconName: 'atom.svg',
        },
        {
          label: 'Manage',
          link: paths.MANAGE,
          iconName: 'feature-store.svg',
        }
      ],
    []
  );

  const images = {
    'smart-home.svg': { icon: Home, viewBox: '0 0 22 24' },
    'atom.svg': { icon: ModelStore, viewBox: '0 0 24 24' },
    'feature-store.svg': { icon: FeatureStore, viewBox: '6 0 12 24' },
  };

  const getTab = useCallback(
    (obj) => {
      /* Extract tab from location  */
      const locationCollection = location.pathname.split('/');

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


  useEffect(() => {
    const matchedtab = getTab(tabs);
    setSelectedTab({ ...matchedtab });
  }, [tabs, location.pathname, getTab])

  const handleSelectedTab = (tab) => {
    if (tab.route) {
      window.location = window.location.origin + url.split('//').join('/');
    } else {
      navigate(tab.link);
      // history.push({
      //   pathname: tab.link,
      // });
    }
  };

  return (
    <Box className="sidebar-container">
      <Box className="logo-icon">
      </Box>
      <Box className="tabs">
        {tabs.map((tab) => (
          <Box className="tab" key={tab.label} onClick={() => handleSelectedTab(tab)}>
            <Box className={`tab-padding ${selectedTab?.label === tab.label && 'active-tab'}`}>
              <SvgIcon
                key={tab.label}
                color="primary"
                component={images[tab.iconName].icon}
                viewBox={images[tab.iconName].viewBox}
                style={{
                  width: '1vw',
                  height: 'clamp(0.8vw, 1vw ,1.2vw)',
                  stroke: variables.white,
                  strokeWidth: '1.5',
                  fill: 'none',
                }}
              />
              {<Typography className="overflow">{tab.label}</Typography>}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default withRouter(Sidebar);

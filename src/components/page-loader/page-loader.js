import React from 'react';
import { Box } from '@material-ui/core';
import './page-loader.scss';
import Card from '../card';

const PageLoader = ({ noTitle }) => {
  return (
    <>
      <Card>
        <Box className="vertical-align-center">
          <Box className="app-loader" style={{ height: noTitle && `calc(100vh - 3.5vw)` }}></Box>
        </Box>
      </Card>
    </>
  );
};

export default PageLoader;

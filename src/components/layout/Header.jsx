import React, { useState, useEffect } from "react";
import {
  Button
} from '@material-ui/core';
import { Box, Typography, Grid } from '@material-ui/core';
import { Link } from "react-router-dom";

function Header() {

  useEffect(() => { }, []);

  /** *****************
  @Purpose : Used for render HTML/Components
  @Parameter : {}
  @Author : shailendra
  ******************/
  return (
    <>
      <header className={`custom-header`}>
        <Grid className="pb-0">
          <Box>
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex align-items-center">
              </div>
            </div>
          </Box>
        </Grid>
      </header>
    </>
  );
}

export default Header;

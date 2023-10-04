import React, { useEffect, useState } from "react";
import withRouter from "../../hooks/withRouter";
import { Box, Typography } from "@material-ui/core";
import "./Manage.scss";

const Manage = ({ history }) => {
  return (
    <Box className="manage-view">
      <Typography>Manage</Typography>
    </Box>
  );
};

export default withRouter(Manage);

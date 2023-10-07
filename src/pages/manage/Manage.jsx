import React, { useEffect, useState } from "react";
import withRouter from "../../hooks/withRouter";
import Card from "../../components/card";
import { Box, Typography } from "@material-ui/core";
import "./Manage.scss";

const Manage = ({ history }) => {
  return (
    <Box className="manage-view" >
      <Card title="Manage" padding="1.111vw 1.111vw 0vw 1.111vw" divider={true}>
      </Card>
    </Box>
  );
};

export default withRouter(Manage);

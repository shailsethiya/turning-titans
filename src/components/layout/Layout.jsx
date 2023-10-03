import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import ChatBot from 'react-simple-chatbot';
import SideBar from "./sidebar/Sidebar.jsx";
import { Box, Typography, Grid } from '@material-ui/core';

function Layout(props) {

  console.log("props", props)

  /** *****************
  @Purpose : Used for render HTML/Components
  @Parameter : {}
  @Author : shailendra
  ******************/

  const steps = [
    {
      id: '0',
      message: 'Welcome to chatbot!',
      trigger: '1',
    },
    {
      id: '1',
      message: 'Bye!',
      end: true,
    },
  ];

  return (
    <Box className="layout">
      <SideBar />
      <Outlet />
      <Box className="chatbot">
        <ChatBot steps={steps} />
      </Box>
    </Box>
  );
}

export default Layout;

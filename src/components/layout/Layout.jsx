import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import ChatBot from 'react-simple-chatbot';
import SideBar from "./sidebar/Sidebar.jsx";
import { Box } from '@material-ui/core';

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
      message: 'Hey! Please select a proposal and asking questions',
    }
  ];

  // Set some properties of the bot
  const config = {
    floating: true,
  };

  return (
    <Box className="layout">
      <SideBar />
      <Outlet />
      <Box className="chatbot">
        <ChatBot
          headerTitle="TitansBot"
          steps={steps}
          {...config} />
      </Box>
    </Box>
  );
}

export default Layout;

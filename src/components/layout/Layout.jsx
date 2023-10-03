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
        message: 'Hey!',
        trigger: 1,
    }, {
        id: '1',
        message: 'Please write your username',
        trigger: 2
    }, {
        id: '2',
        user: true,
        trigger: 3,
    }, {
        id: '3',
        message: " hi {previousValue}, how can I help you?",
        trigger: 4
    }, {
        id: '4',
        options: [
            { value: 1, label: 'View Courses' },
            { value: 2, label: 'Read Articles' },
 
        ],
        end: true
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

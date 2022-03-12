import React from "react";
import { Outlet } from "react-router";

import { Box } from "@mui/material";
import SideNav from "../components/SideNav";
import LogoutButton from "../components/Buttons/LogoutButton";

const Dashboard = () => {
  return (
    <Box height="100vh" width="100vw" display="flex">
      <SideNav />
      <LogoutButton />
      <Box flexGrow={1} height="100%" p={3}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;

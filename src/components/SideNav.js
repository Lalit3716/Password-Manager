import React from "react";
import { useLocation, useNavigate } from "react-router";

import {
  Box,
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemButton,
} from "@mui/material";
import { Key, Language } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors";

const SideNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box height="100vh" bgcolor="grey">
      <List>
        <ListItemButton
          onClick={() => navigate("accounts")}
          selected={pathname.includes("accounts")}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: red[700] }}>
              <Key />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Accounts" secondary="All accounts" />
        </ListItemButton>
        <ListItemButton
          onClick={() => navigate("websites")}
          selected={pathname.includes("websites")}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: blue[700] }}>
              <Language />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Websites"
            secondary="Accounts grouped by websites"
          />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default SideNav;

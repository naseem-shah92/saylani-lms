import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import ContactsIcon from '@mui/icons-material/Contacts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "My Courses", icon: <ImportContactsIcon />, path: "/courses" },
  { text: "Progress", icon: <ContactsIcon />, path: "/progress" },
  { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 70,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 240 : 70,
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 1 }}>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>

      <List>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItemButton
              key={index}
              component={Link}
              to={item.path}
              selected={isActive}
              sx={{
                borderRadius: 2,
                margin: "4px 8px",
                width: "auto",
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "white",
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          );
        })}

        <ListItemButton
          component={Link}
          to="/"
          onClick={() => localStorage.removeItem("isLoggedIn")}
        >
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          {open && <ListItemText primary="Logout" />}
        </ListItemButton>
      </List>
    </Drawer>
  )
}

export default Sidebar
import styled from "styled-components";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Toolbar,
  Box,
} from "@mui/material";
import { Inbox as InboxIcon, Mail as MailIcon } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const primaryColor = "#1E1E2F";
const whiteColor = "#FFFFFF";

const DrawerStyled = styled(Drawer)`
  && {
    width: 240px;
    flex-shrink: 0;
    .MuiDrawer-paper {
      background-color: ${primaryColor};
      color: ${whiteColor};
      width: 240px;
      box-sizing: border-box;
      z-index: 1200;
    }
  }
`;

const NavLinkStyled = styled(NavLink)`
  color: inherit;
  text-decoration: none;
  &.active {
    color: inherit;
    text-decoration: none;
  }
`;

const Sidebar = () => {
  return (
    <>
      <DrawerStyled variant="persistent" open={true}>
        <Toolbar component={NavLinkStyled} to={`/dashboard`}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img
              style={{ height: "40px" }}
              src="tasks.png"
              alt="Task You"
              className="logoimg"
            />
          </IconButton>
          <Typography variant="h6" noWrap>
            TaskYou
          </Typography>
        </Toolbar>
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Dashboard", "Task", "Team"].map((text, index) => (
              <ListItem
                button
                component={NavLinkStyled}
                to={`/${text.toLowerCase()}`}
                key={text}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <InboxIcon style={{ color: whiteColor }} />
                  ) : (
                    <MailIcon style={{ color: whiteColor }} />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} style={{ color: whiteColor }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </DrawerStyled>
    </>
  );
};

export default Sidebar;
// this is my sidebar.jsx

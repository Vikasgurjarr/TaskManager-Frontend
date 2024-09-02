import styled from "styled-components";
import { AppBar, Drawer } from "@mui/material";

// Define colors
export const primaryColor = "#1E1E2F";
export const secondaryColor = "#4CAF50";
export const whiteColor = "#FFFFFF";
export const lightGreyColor = "#F4F5F7";
export const darkGreyColor = "#343A40";
export const greenColor = "#4CAF50";
export const orangeColor = "#FF9800";
export const redColor = "#FF0000";

// Styled components for customizing Material-UI components
export const AppBarStyled = styled(AppBar)`
  && {
    background-color: ${whiteColor};
    z-index: 1240;
    position: fixed;
    width: calc(100% - 240px);
    margin-left: 240px;
  }
`;

export const DrawerStyled = styled(Drawer)`
  && {
    width: 240px;
    flex-shrink: 0;
    .MuiDrawer-paper {
      background-color: ${primaryColor};
      color: ${whiteColor};
      width: 240px;
      position: fixed;
      box-sizing: border-box;
      z-index: 1200;
    }
  }
`;

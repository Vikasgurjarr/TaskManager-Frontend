import { Box } from "@mui/material";
import { AppBarStyled, DrawerStyled } from "./dashboardStyle";
import TopBar from "./topAppBar";
import ContentSection from "./mainContent";
import Sidebar from "./sidebar";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      {/* Side Drawer */}
      <DrawerStyled variant="permanent">
        {/* Drawer content */}
        <Sidebar />
      </DrawerStyled>

      {/* Top App Bar */}
      <AppBarStyled>
        <TopBar />
      </AppBarStyled>

      {/* Profile Menu */}
      {/* Profile menu content */}

      {/* Main Content Area */}
      <ContentSection />
    </Box>
  );
};

export default Dashboard;

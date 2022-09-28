import {
  AppBar,
  Drawer,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SettingToggle from "./SettingToggle";

const AppBarSettings = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleDrawerChange = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          width: { md: drawerOpen ? `calc(100 - 256px)` : "100%", xs: "100%" },
          ml: { md: drawerOpen ? "256px" : "inherit", xs: "inherit" },
        }}
      >
        <Toolbar>
          <IconButton
            sx={{
              mr: 3,
              p: 0,
              display: { md: !drawerOpen ? "inherit" : "none" },
            }}
            onClick={handleDrawerChange}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Rolldapass
          </Typography>
          <Icon>more_vert</Icon>
        </Toolbar>
      </AppBar>
      <Drawer
        onClose={handleDrawerChange}
        open={drawerOpen}
        variant="temporary"
        sx={{ display: { xs: "block", md: "none" } }}
      >
        Test
      </Drawer>
      <Drawer
        variant="persistent"
        anchor="left"
        sx={{
          display: { xs: "none", md: "block" },
          width: 256,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 256,
            boxSizing: "border-box",
          },
        }}
        onClose={handleDrawerChange}
        open={drawerOpen}
      >
        <IconButton onClick={handleDrawerChange}>
          <Icon>close</Icon>
        </IconButton>
        <SettingToggle toggleProperty="test" toggleLabel="Test here" />
      </Drawer>
    </div>
  );
};

export default AppBarSettings;

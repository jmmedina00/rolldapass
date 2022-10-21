import {
  AppBar,
  Drawer,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { openAbout } from "../settingsSlice";
import About from "./About";
import DrawerContents from "./DrawerContents";

const AppBarSettings = () => {
  const dispatch = useAppDispatch();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const menuOpen = !!anchorMenu;

  const handleDrawerChange = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };

  const handleOpenAbout = () => {
    setAnchorMenu(null);
    dispatch(openAbout());
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
          <IconButton onClick={handleMenuButtonClick}>
            <Icon>more_vert</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        onClose={handleDrawerChange}
        open={drawerOpen}
        variant="temporary"
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <DrawerContents />
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
        <DrawerContents />
      </Drawer>
      <Menu
        anchorEl={anchorMenu}
        open={menuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>Language: English</MenuItem>
        <MenuItem onClick={handleOpenAbout}>About</MenuItem>
      </Menu>
      <About />
    </div>
  );
};

export default AppBarSettings;

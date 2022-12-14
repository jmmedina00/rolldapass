import {
  AppBar,
  Drawer,
  DrawerProps,
  Grid,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { openAbout, toggleDrawer } from "../settingsSlice";
import About from "./About";
import DrawerContents from "./DrawerContents";
import LanguageChanger from "./LanguageChanger";

const drawerSmallDisplay = { variant: "temporary" as DrawerProps["variant"] };

const drawerLargeDisplay = {
  variant: "persistent" as DrawerProps["variant"],
  anchor: "left",
  sx: {
    display: { xs: "none", md: "block" },
    width: 256,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: 256,
      boxSizing: "border-box",
    },
  },
};

const AppBarSettings = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("settings");
  const drawerOpen = useAppSelector((state) => state.settings.settingsOpen);
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const menuOpen = !!anchorMenu;

  const theme = useTheme();
  const isLargeDisplay = useMediaQuery(theme.breakpoints.up("md"));

  const handleDrawerChange = () => {
    dispatch(toggleDrawer());
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

  const settingsMenu = <DrawerContents key="foo" />;

  const fancyCloseButton = (
    <Grid sx={{ display: "flex" }} key="bar">
      <Grid item sx={{ flexGrow: 1 }}></Grid>
      <Grid item>
        <IconButton onClick={handleDrawerChange}>
          <Icon>chevron_left</Icon>
        </IconButton>
      </Grid>
    </Grid>
  );

  const drawerSettings = isLargeDisplay
    ? drawerLargeDisplay
    : drawerSmallDisplay;
  const contents = isLargeDisplay
    ? [fancyCloseButton, settingsMenu]
    : settingsMenu;

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          width: { md: drawerOpen ? `calc(100% - 256px)` : "100%", xs: "100%" },
          ml: { md: drawerOpen ? "256px" : "inherit", xs: "inherit" },
        }}
      >
        <Toolbar>
          <IconButton
            sx={{
              mr: 3,
              p: 0,
              display: { md: !drawerOpen ? "inherit" : "none" },
              color: "white",
            }}
            onClick={handleDrawerChange}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Rolldapass
          </Typography>
          <IconButton onClick={handleMenuButtonClick} sx={{ color: "white" }}>
            <Icon>more_vert</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        {...drawerSettings}
        onClose={handleDrawerChange}
        open={drawerOpen}
      >
        {contents}
      </Drawer>
      <Menu
        anchorEl={anchorMenu}
        open={menuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <LanguageChanger />
        <MenuItem onClick={handleOpenAbout}>{t("aboutItem")}</MenuItem>
      </Menu>
      <About />
      <Box height={theme.mixins.toolbar.minHeight} />
    </div>
  );
};

export default AppBarSettings;

import { AppBar, Icon, Toolbar, Typography } from "@mui/material";

const AppBarSettings = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Icon sx={{ mr: 3 }}>menu</Icon>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Rolldapass
          </Typography>
          <Icon>more_vert</Icon>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarSettings;

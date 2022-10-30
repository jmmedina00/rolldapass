import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { usePWAInstall } from "react-use-pwa-install";
import { Settings } from "../constants";
import SettingToggle from "./SettingToggle";

const DrawerContents = () => {
  const install = usePWAInstall();
  const settings = Object.entries(Settings);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
      <Stack sx={{ flexGrow: 1 }}>
        {settings.map(([_, property]) => (
          <SettingToggle key={property} property={property} />
        ))}
      </Stack>
      <Button
        sx={{ display: !!install ? "inherit" : "none" }}
        onClick={install}
        fullWidth
      >
        Install to desktop
      </Button>
    </Box>
  );
};

export default DrawerContents;

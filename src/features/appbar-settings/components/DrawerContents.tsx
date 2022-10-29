import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { usePWAInstall } from "react-use-pwa-install";
import { Settings } from "../constants";
import SettingToggle, { SettingToggleProperty } from "./SettingToggle";

const settingsLabels: SettingToggleProperty[] = [
  { toggleProperty: Settings.DarkTheme, toggleLabel: "Dark theme" },
  { toggleProperty: Settings.Entropy, toggleLabel: "Get password entropy" },
  { toggleProperty: Settings.AdvancedConfig, toggleLabel: "Advanced options" },
  { toggleProperty: Settings.HaveIBeenPwned, toggleLabel: "HaveIBeenPwned" },
  {
    toggleProperty: Settings.PassManagerOrganized,
    toggleLabel: "Organize password managers",
  },
];

const DrawerContents = () => {
  const install = usePWAInstall();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
      <Stack sx={{ flexGrow: 1 }}>
        {settingsLabels.map(({ toggleProperty, toggleLabel }) => (
          <SettingToggle
            key={toggleProperty}
            toggleProperty={toggleProperty}
            toggleLabel={toggleLabel}
          />
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

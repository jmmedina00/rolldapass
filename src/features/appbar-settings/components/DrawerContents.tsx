import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Settings } from "../constants";
import SettingToggle, { SettingToggleProperty } from "./SettingToggle";

const settingsLabels: SettingToggleProperty[] = [
  { toggleProperty: Settings.DarkTheme, toggleLabel: "Dark theme" },
  { toggleProperty: Settings.AdvancedConfig, toggleLabel: "Advanced options" },
  { toggleProperty: Settings.HaveIBeenPwned, toggleLabel: "HaveIBeenPwned" },
  {
    toggleProperty: Settings.PassManagerOrganized,
    toggleLabel: "Organize password managers",
  },
];

const DrawerContents = () => {
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
      <Button fullWidth>Install to desktop</Button>
    </Box>
  );
};

export default DrawerContents;

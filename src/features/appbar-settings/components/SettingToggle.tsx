import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { initializeSetting, toggleSetting } from "../settingsSlice";

interface SettingToggleProperty {
  property: string;
}

const SettingToggle = ({ property }: SettingToggleProperty) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("settings");
  const enabled = useAppSelector((state) => state.settings.toggle[property]);

  if (enabled === undefined) {
    dispatch(initializeSetting(property));
  }

  const handleChange = () => {
    dispatch(toggleSetting(property));
  };

  const toggle = <Switch checked={enabled || false} onChange={handleChange} />;

  return (
    <FormGroup>
      <FormControlLabel
        labelPlacement="start"
        control={toggle}
        label={t("toggles." + property)}
        sx={{ width: "calc(100% - 16px)" }}
      />
    </FormGroup>
  );
};

export default SettingToggle;

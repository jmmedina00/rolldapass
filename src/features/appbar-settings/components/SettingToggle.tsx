import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { toggleSetting } from "../settingsSlice";

export interface SettingToggleProperty {
  toggleProperty: string;
  toggleLabel: string;
}

const SettingToggle = ({
  toggleProperty,
  toggleLabel,
}: SettingToggleProperty) => {
  const dispatch = useAppDispatch();
  const enabled = useAppSelector(
    (state) => state.settings.toggle[toggleProperty] || false
  );

  const handleChange = () => {
    dispatch(toggleSetting(toggleProperty));
  };

  const toggle = <Switch checked={enabled} onChange={handleChange} />;

  return (
    <FormGroup>
      <FormControlLabel
        labelPlacement="start"
        control={toggle}
        label={toggleLabel}
      />
    </FormGroup>
  );
};

export default SettingToggle;

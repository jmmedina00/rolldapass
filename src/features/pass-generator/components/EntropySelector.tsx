import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { changeEntropy } from "../passHealthSlice";

const EntropySelect = () => {
  const { t } = useTranslation("passgen");
  const [items, setItems] = useState<JSX.Element[]>([]);
  const dispatch = useAppDispatch();
  const entropy = useAppSelector((state) => state.passwordHealth.entropy);

  const handleEntropyChange = (event: SelectChangeEvent) => {
    dispatch(changeEntropy(event.target.value));
  };

  useEffect(() => {
    import("../services/entropy").then(({ default: entropyService }) => {
      setItems(
        entropyService.list.map((name) => (
          <MenuItem key={name} value={name}>
            {entropyService.algorithms[name].label}
          </MenuItem>
        ))
      );
    });
  }, []);

  if (items.length === 0) {
    return <div />;
  }

  return (
    <Grid sx={{ textAlign: "right" }}>
      <FormControl>
        <InputLabel>{t("entropySelect")}</InputLabel>
        <Select
          label="Entropy algorythm"
          variant="outlined"
          value={entropy}
          onChange={handleEntropyChange}
          sx={{ minWidth: 300, textAlign: "left" }}
        >
          {items}
        </Select>
      </FormControl>
    </Grid>
  );
};
export default EntropySelect;

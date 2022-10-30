import { Chip, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import CharsetDefinition, { TranslatedLabel } from "../constants";
import { toggleCharset } from "../configSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CharsetChip = ({ label, charset, category }: CharsetDefinition) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("config");

  const [finalLabel, setFinalLabel] = useState<string>("");

  const enabled = useAppSelector((state) => {
    const activeCharsets = state.config.charsets[category];
    return !!activeCharsets.find((anyCharset) => anyCharset === charset);
  });

  const handleClick = () => {
    dispatch(toggleCharset({ charset, category }));
  };

  useEffect(() => {
    if (typeof label === "string") {
      setFinalLabel(label as string);
      return;
    }

    const { key, clarification = "" } = label as TranslatedLabel;
    const translated = t(key, { clarify: clarification });
    setFinalLabel(translated);
  }, [t, label]);

  return (
    <Grid item>
      <Chip
        label={finalLabel}
        color={enabled ? "primary" : "default"}
        onClick={handleClick}
      />
    </Grid>
  );
};

export default CharsetChip;

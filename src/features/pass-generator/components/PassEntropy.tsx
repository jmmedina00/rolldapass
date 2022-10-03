import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import entropyService from "../services/entropy";
import EntropySelect from "./EntropySelector";

const PassEntropy = () => {
  const password = useAppSelector((state) => state.passwordGenerator.password);
  const entropy = useAppSelector((state) => state.passwordHealth.entropy);

  const [percent, setPercent] = useState<number>(0);
  const [displayInfo, setInfo] = useState<string>("");

  useEffect(() => {
    const { info, strengthPercent } =
      entropyService.algorithms[entropy].calculator(password);
    setPercent(strengthPercent);
    setInfo(info);
  }, [password, entropy]);

  return (
    <Box>
      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{ height: 8, borderRadius: 4 }}
      />
      <Typography variant="overline" align="right" paragraph={true}>
        {displayInfo}
      </Typography>
      <EntropySelect />
    </Box>
  );
};

export default PassEntropy;

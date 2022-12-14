import { Box } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { Settings } from "../../appbar-settings/constants";
import EntropySelect from "./EntropySelector";
import PassInfo from "./PassInfo";
import PassField from "./PassField";

const PassGenerator = () => {
  const entropyEnabled = useAppSelector(
    (state) => state.settings.toggle[Settings.Entropy]
  );

  return (
    <Box p={3}>
      <PassField />
      <PassInfo />
      {entropyEnabled ? <EntropySelect /> : <div />}
    </Box>
  );
};

export default PassGenerator;

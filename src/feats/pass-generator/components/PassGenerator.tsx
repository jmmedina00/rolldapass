import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PassEntropy from "./PassEntropy";

const PassGenerator = () => (
  <Box p={3}>
    <TextField
      variant="filled"
      type="password"
      label="Generate your password"
      fullWidth
    />
    <PassEntropy />
  </Box>
);

export default PassGenerator;

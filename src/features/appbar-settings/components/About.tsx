import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  Link,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeAbout } from "../settingsSlice";

const linkedinSpam =
  "https://www.linkedin.com/in/juan-miguel-medina-prieto-88926715a/";
const haveIBeenPwned = "https://haveibeenpwned.com/";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, index, value }: TabPanelProps) => (
  <Box sx={{ display: index === value ? "inherit" : "none", marginTop: 1 }}>
    <DialogContentText>{children}</DialogContentText>
  </Box>
);

const About = () => {
  const dispatch = useAppDispatch();
  const aboutOpen = useAppSelector((state) => state.settings.aboutOpen);
  const [tabValue, setTabValue] = useState<number>(0);

  const handleCloseAbout = () => {
    dispatch(closeAbout());
  };

  const handleChangeTab = (event: React.SyntheticEvent, newTab: number) => {
    setTabValue(newTab);
  };

  return (
    <Dialog open={aboutOpen} onClose={handleCloseAbout} fullWidth>
      <DialogTitle sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1, lineHeight: 1.9 }}>About</Box>
        <IconButton onClick={handleCloseAbout}>
          <Icon>close</Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item sx={{ textAlign: "center", verticalAlign: "middle" }}>
            <Box
              component="img"
              src="logo192.png"
              sx={{ height: 100, width: 100 }}
            />
          </Grid>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5">Rolldapass</Typography>
          </Grid>
        </Grid>
        <Tabs value={tabValue} onChange={handleChangeTab}>
          <Tab label="About" />
          <Tab label="Libraries" />
          <Tab label="Other" />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          Created by <Link href={linkedinSpam}>Juan Miguel Medina Prieto</Link>{" "}
          and distributed under the terms of the MIT License
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6">zxcvbn</Typography>
          <Typography variant="overline">by Dropbox</Typography>
          {}
          <Typography variant="h6">KeePass</Typography>
          <Typography variant="overline">
            implemented with Password-Quality-Calculator by EYHN
          </Typography>
          {}
          <Typography variant="h6">Password Meter / UIC</Typography>
          <Typography variant="overline">implemented by Hamed Fathi</Typography>
          {}
          <Typography variant="h6">TAI Shannon</Typography>
          <Typography variant="overline">
            included in tai-password-strength by tests-always-included
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          Password checking services provided by{" "}
          <Link href={haveIBeenPwned}>HaveIBeenPwned</Link> under the Creative
          Commons 4.0 International License
          <Box>CC/BY badge here</Box>
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

export default About;

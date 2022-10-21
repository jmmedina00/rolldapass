import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const linkedinSpam =
  "https://www.linkedin.com/in/juan-miguel-medina-prieto-88926715a/";
const haveIBeenPwned = "https://haveibeenpwned.com/";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, index, value }: TabPanelProps) => (
  <Box sx={{ display: index === value ? "inherit" : "none" }}>
    <DialogContentText>{children}</DialogContentText>
  </Box>
);

const About = () => {
  const [aboutOpen, setAboutOpen] = useState<boolean>(true);
  const [tabValue, setTabValue] = useState<number>(0);

  const handleCloseAbout = () => {
    setAboutOpen(false);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newTab: number) => {
    setTabValue(newTab);
  };

  return (
    <Dialog open={aboutOpen} onClose={handleCloseAbout}>
      <DialogTitle>About</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={3}>
            <Box
              component="img"
              src="logo192.png"
              sx={{ height: 100, width: 100 }}
            />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h3">Rolldapass</Typography>
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
          <Typography variant="h5">zxcvbn</Typography>
          <Typography variant="h6">by Dropbox</Typography>
          {}
          <Typography variant="h5">KeePass</Typography>
          <Typography variant="h6">
            implemented with Password-Quality-Calculator by EYHN
          </Typography>
          {}
          <Typography variant="h5">Password Meter / UIC</Typography>
          <Typography variant="h6">implemented by Hamed Fathi</Typography>
          {}
          <Typography variant="h5">TAI Shannon</Typography>
          <Typography variant="h6">
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

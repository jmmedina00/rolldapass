import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

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
          Test A
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          Test B
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          Test C
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

export default About;

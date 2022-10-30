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
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("settings");
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
        <Box sx={{ flexGrow: 1, lineHeight: 1.9 }}>{t("about.title")}</Box>
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
          <Tab label={t("about.tabs.about")} />
          <Tab label={t("about.tabs.libraries")} />
          <Tab label={t("about.tabs.other")} />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          {t("about.main.created")}
          <Link href={linkedinSpam}>Juan Miguel Medina Prieto</Link>
          {t("about.main.license")}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography component="span" variant="h6" display="block">
            zxcvbn
          </Typography>
          <Typography variant="overline">
            {t("about.libraries.zxcvbn", { author: "Dropbox" })}
          </Typography>
          {}
          <Typography component="span" variant="h6" display="block">
            KeePass
          </Typography>
          <Typography variant="overline">
            {t("about.libraries.keepass", {
              library: "Password-Quality-Calculator",
              author: "EYHN",
            })}
          </Typography>
          {}
          <Typography component="span" variant="h6" display="block">
            Password Meter / UIC
          </Typography>
          <Typography variant="overline">
            {t("about.libraries.uic", { author: "Hamed Fathi" })}
          </Typography>
          {}
          <Typography component="span" variant="h6" display="block">
            TAI Shannon
          </Typography>
          <Typography variant="overline">
            {t("about.libraries.tai", {
              library: "tai-password-strength",
              author: "tests-always-included",
            })}
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          {t("about.other.checking")}
          <Link href={haveIBeenPwned}>HaveIBeenPwned</Link>
          {t("about.other.license")}
          <Box component="span" display="block">
            CC/BY badge here
          </Box>
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

export default About;
